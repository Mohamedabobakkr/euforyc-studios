/**
 * GET /api/sips/catalog
 * Fetches Square catalog and returns parsed menu categories with modifiers.
 */

import { NextResponse } from 'next/server';
import { squareFetch, SquareApiError } from '@/lib/square';
import type { MenuItem, MenuCategory, MenuModifierGroup } from '@/lib/sips-types';

export const dynamic = 'force-dynamic';

/* ── In-memory cache (5 min TTL) ── */
let cachedResult: { categories: MenuCategory[] } | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SquareCatalogObject {
  type: string;
  id: string;
  [key: string]: any;
}

interface SquareCatalogResponse {
  objects?: SquareCatalogObject[];
  cursor?: string;
}

async function fetchAllCatalogObjects(): Promise<SquareCatalogObject[]> {
  const all: SquareCatalogObject[] = [];
  let cursor: string | undefined;

  do {
    const params = new URLSearchParams({
      types: 'ITEM,CATEGORY,IMAGE,MODIFIER_LIST',
    });
    if (cursor) params.set('cursor', cursor);

    const data = await squareFetch<SquareCatalogResponse>(
      `/catalog/list?${params.toString()}`,
    );

    if (data.objects) {
      all.push(...data.objects);
    }
    cursor = data.cursor;
  } while (cursor);

  return all;
}

export async function GET() {
  try {
    if (cachedResult && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
      return NextResponse.json(
        { success: true, categories: cachedResult.categories },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'X-Cache': 'HIT',
          },
        },
      );
    }

    const objects = await fetchAllCatalogObjects();

    // Separate by type
    const items = objects.filter((o) => o.type === 'ITEM');
    const categories = objects.filter((o) => o.type === 'CATEGORY');
    const images = objects.filter((o) => o.type === 'IMAGE');
    const modifierLists = objects.filter((o) => o.type === 'MODIFIER_LIST');

    // Build lookup maps
    const categoryMap = new Map<string, string>();
    for (const cat of categories) {
      const name = cat.category_data?.name;
      if (name) categoryMap.set(cat.id, name);
    }

    const imageMap = new Map<string, string>();
    for (const img of images) {
      const url = img.image_data?.url;
      if (url) imageMap.set(img.id, url);
    }

    // Build modifier group map: modifier_list_id → MenuModifierGroup
    const modifierGroupMap = new Map<string, MenuModifierGroup>();
    for (const ml of modifierLists) {
      const mlData = ml.modifier_list_data;
      if (!mlData) continue;

      const modifiers = (mlData.modifiers || []).map((mod: any) => ({
        id: mod.id,
        name: mod.modifier_data?.name || 'Unknown',
        pricePence: mod.modifier_data?.price_money?.amount || 0,
      }));

      if (modifiers.length > 0) {
        modifierGroupMap.set(ml.id, {
          id: ml.id,
          name: mlData.name || 'Options',
          selectionType: mlData.selection_type === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
          modifiers,
        });
      }
    }

    console.log('[Sips Catalog] Modifier groups found:', modifierGroupMap.size);

    // Parse items into MenuItems
    const menuItems: MenuItem[] = items
      .filter((item) => item.item_data?.variations?.length)
      .map((item) => {
        const data = item.item_data!;

        // Resolve category
        let catName = 'Other';
        if (data.categories?.length) {
          catName = categoryMap.get(data.categories[0].id) || 'Other';
        } else if (data.category_id) {
          catName = categoryMap.get(data.category_id) || 'Other';
        } else if (data.reporting_category?.id) {
          catName = categoryMap.get(data.reporting_category.id) || 'Other';
        }

        // Resolve image
        const imgUrl = data.image_ids?.[0]
          ? imageMap.get(data.image_ids[0])
          : undefined;

        // Resolve modifier groups for this item
        const itemModifierGroups: MenuModifierGroup[] = [];
        const modListInfo = data.modifier_list_info || [];
        for (const mlInfo of modListInfo) {
          const mlId = mlInfo.modifier_list_id;
          if (mlId && modifierGroupMap.has(mlId)) {
            const group = modifierGroupMap.get(mlId)!;
            // If the item overrides which modifiers are enabled, filter them
            if (mlInfo.modifier_overrides?.length) {
              const enabledIds = new Set(
                mlInfo.modifier_overrides
                  .filter((ov: any) => !ov.on_by_default === false || ov.on_by_default === undefined)
                  .map((ov: any) => ov.modifier_id)
              );
              // Only filter if overrides actually disable some
              const hasDisabled = mlInfo.modifier_overrides.some(
                (ov: any) => ov.on_by_default === false
              );
              if (hasDisabled) {
                const filtered = group.modifiers.filter((m) => !enabledIds.has(m.id) || enabledIds.has(m.id));
                itemModifierGroups.push({ ...group, modifiers: filtered });
              } else {
                itemModifierGroups.push(group);
              }
            } else {
              itemModifierGroups.push(group);
            }
          }
        }

        return {
          id: item.id,
          name: data.name || 'Unnamed',
          description: data.description || '',
          categoryName: catName,
          variations: (data.variations || []).map((v: any) => ({
            id: v.id,
            name: v.item_variation_data?.name || 'Regular',
            pricePence: v.item_variation_data?.price_money?.amount || 0,
          })),
          modifierGroups: itemModifierGroups,
          imageUrl: imgUrl,
        };
      });

    // Group by category
    const grouped = new Map<string, MenuItem[]>();
    for (const item of menuItems) {
      const list = grouped.get(item.categoryName) || [];
      list.push(item);
      grouped.set(item.categoryName, list);
    }

    // Sort categories in exact preferred order
    // Each entry is a keyword — categories are matched in this sequence.
    // Secret menus follow their parent category automatically.
    const preferredOrder = [
      'matcha',              // MATCHA
      'matcha secret',       // Matcha Secret menu
      'coffee',              // COFFEE
      'coffee (secret',      // COFFEE (SECRET MENU)
      'wellness smoothie',   // WELLNESS SMOOTHIES
      'protein',             // PROTEIN SHAKES
      'ramadan',             // RAMADAN SPECIALS
      'toastie',             // BITES: TOASTIES
      'granola',             // BITES: Granola & Milk Cake
      'bakery',              // BITES: BAKERY
      'tea',                 // Tea & Chai
      'water',               // Water
      'retail',              // Euforyc Products (Retail)
    ];

    const getCategoryOrder = (name: string): number => {
      const lower = name.toLowerCase();
      for (let i = 0; i < preferredOrder.length; i++) {
        if (lower.includes(preferredOrder[i])) return i;
      }
      return preferredOrder.length; // unmatched go to end
    }

    const result: MenuCategory[] = Array.from(grouped.entries())
      .map(([name, categoryItems]) => ({ name, items: categoryItems }))
      .sort((a, b) => {
        const aIdx = getCategoryOrder(a.name);
        const bIdx = getCategoryOrder(b.name);
        if (aIdx !== bIdx) return aIdx - bIdx;
        return a.name.localeCompare(b.name);
      });

    console.log('[Sips Catalog] Categories:', result.map((c) => `${c.name} (${c.items.length} items)`).join(', '));
    // Log modifier info
    const itemsWithMods = menuItems.filter((i) => i.modifierGroups.length > 0);
    console.log('[Sips Catalog] Items with modifiers:', itemsWithMods.length, itemsWithMods.map((i) => `${i.name} (${i.modifierGroups.map((g) => g.name).join(', ')})`).join('; '));

    cachedResult = { categories: result };
    cacheTimestamp = Date.now();

    return NextResponse.json(
      { success: true, categories: result },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (error) {
    console.error('[Sips Catalog API] Error:', error);

    const status = error instanceof SquareApiError ? error.statusCode : 500;
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu' },
      { status },
    );
  }
}

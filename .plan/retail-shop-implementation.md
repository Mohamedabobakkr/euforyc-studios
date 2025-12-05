# Retail Shop Implementation Plan

## Overview
Add a retail/shop section to sell studio products (grip socks and tote bag) with Momence integration for purchases.

## Architecture & Design Decisions

### 1. Page Structure
- **Route:** `/app/shop/page.tsx`
- **Navigation Label:** "SHOP"
- **Design Pattern:** Follow existing pages (packages, gift cards, memberships)
- **Payment:** Link to Momence URLs (like gift cards do)

### 2. Navigation Placement
**Recommended: Add "SHOP" to LEFT navigation items**
```
Current Left Nav: ABOUT • TEAM • GIFTING • PACKAGES & MEMBERSHIPS
Proposed: ABOUT • TEAM • SHOP • GIFTING • PACKAGES & MEMBERSHIPS
```

**Why left side?**
- Shop is a product offering (like packages/memberships)
- Keeps right nav focused on actions (BOOK, CONTACT, FAQ, PRICE LIST)
- Balanced navigation split

**Alternative:** Could go in right nav before BOOK if you prefer

### 3. Page Design Layout

#### Hero Section
- Clean, minimal header
- Title: "STUDIO SHOP" or "RETAIL"
- Subtitle: "Essential gear for your pilates journey"
- Background: Cream (#fffcf2) gradient (consistent with other pages)

#### Products Grid Section
- 2-column grid (desktop) / 1-column (mobile)
- Product card design matching packages/memberships style
- Each card includes:
  - Product image (aspect-square, hover zoom effect)
  - Product name (serif typography)
  - Description (body text)
  - Price (large, prominent)
  - "BUY NOW" button → Momence link (external)
  - Optional: "Available in-studio" badge

#### Additional Sections (Optional)
- Benefits section: "Why shop with us?"
- Returns/pickup information
- CTA to book a class

### 4. Product Data Structure

```typescript
interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  momenceUrl: string;
  badge?: string; // e.g., "Member Favorite", "Essential"
  features?: string[]; // Optional bullet points
}
```

Products data will be defined in the page (not a separate CMS - keeping it simple for 2 products).

### 5. Required Assets

**Images needed:**
- `public/grip-socks.jpg` - Product photo of grip socks
- `public/tote-bag.jpg` - Product photo of tote bag

**Momence URLs needed:**
- Grip socks purchase URL
- Tote bag purchase URL

### 6. File Changes Required

#### New Files:
1. `/app/shop/page.tsx` - Main shop page

#### Modified Files:
1. `components/Navigation.tsx` - Add SHOP to navigation
2. `components/Footer.tsx` - Add Shop link to footer
3. `app/sitemap.ts` - Add /shop to sitemap (if exists)

### 7. Design Specifications

**Color Palette** (existing):
- Background: #fffcf2 (cream)
- Dark text/backgrounds: #1a260e (dark green)
- Accent: Use existing green variations

**Typography** (existing):
- Headings: font-serif
- Body: font-sans
- Tracking: 0.2em for uppercase labels

**Components to reuse:**
- Similar card design to packages page
- Button styles from existing pages
- Section padding (section-padding class)
- Container width (container-width class)

**Responsive Design:**
- Mobile: Single column product grid
- Tablet: 2 columns
- Desktop: 2 columns (since only 2 products)
- When product count grows: Switch to 3-4 column grid

### 8. SEO Considerations

**Metadata:**
```typescript
title: 'Shop - Euforyc Studios'
description: 'Shop pilates grip socks and tote bags at Euforyc Studios London. Premium studio retail products for your pilates practice.'
```

**Schema markup:** Product schema for each item (optional enhancement)

### 9. User Experience Flow

1. User clicks "SHOP" in navigation
2. Lands on shop page with hero + product grid
3. Browses products (grip socks, tote bag)
4. Clicks "BUY NOW" on desired product
5. Redirects to Momence checkout (external)
6. Completes purchase on Momence
7. Can return to site or book a class

### 10. Future Scalability

**When adding more products:**
- Products array can easily expand
- Grid automatically adjusts to 3-4 columns
- Could add filtering/categories if needed
- Could add product detail pages (e.g., /shop/grip-socks)

**Potential enhancements:**
- Size/color variants (if applicable)
- Product reviews/testimonials
- Bundle deals (grip socks + tote bag)
- Member discounts messaging

## Implementation Steps

1. ✅ **Gather assets**
   - Get product photos
   - Get Momence purchase URLs for each product

2. **Create shop page**
   - Build `/app/shop/page.tsx`
   - Add product data
   - Implement hero section
   - Build product grid with cards
   - Add mobile responsiveness

3. **Update navigation**
   - Add "SHOP" to Navigation.tsx left nav items
   - Test mobile menu

4. **Update footer**
   - Add shop link to footer quick links

5. **Test & refine**
   - Test all Momence links
   - Check mobile responsiveness
   - Verify design consistency
   - SEO metadata check

6. **Deploy**
   - Commit changes
   - Push to GitHub
   - Verify on live site

## Questions for User Before Implementation

1. **Product Photos:** Do you have product photos ready? If not, do you want me to create placeholder image areas?

2. **Momence URLs:** Do you have the Momence purchase URLs for:
   - Grip socks
   - Tote bag

3. **Product Details:**
   - Grip socks: What's the price? Any specific features to highlight?
   - Tote bag: What's the price? Any specific features?

4. **Navigation Position:** Confirm SHOP in left nav is okay, or prefer right nav?

5. **In-Studio Pickup:** Should we mention products available for in-studio pickup?

## Design Preview (Text Description)

The shop page will feature:
- Clean cream background with dark green accents
- "STUDIO SHOP" heading in large serif font
- 2-column grid with beautiful product cards
- Each card: Product image on top, details below, prominent BUY NOW button
- Hover effects on images (subtle zoom)
- Consistent spacing and typography with existing pages
- Mobile-optimized with single column layout

This creates a premium, boutique shopping experience that matches your existing brand aesthetic.

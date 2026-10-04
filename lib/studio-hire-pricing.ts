/* ── Studio Hire — per-person room rates by guest count ── */

export const REFORMER_PP: Record<number, number> = {
  2: 80, 3: 70, 4: 60, 5: 50, 6: 40, 7: 35, 8: 32,
};

export const HOT_PILATES_PP: Record<number, number> = {
  2: 70, 3: 60, 4: 50, 5: 42, 6: 36, 7: 32, 8: 28,
};

export function getPerPerson(room: string, guests: number): number {
  const table = room === 'reformer' ? REFORMER_PP : HOT_PILATES_PP;
  const clamped = Math.max(2, Math.min(8, guests));
  return table[clamped] ?? 0;
}

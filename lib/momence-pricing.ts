export type MomencePurchaseCategory =
  | 'intro_offer'
  | 'dance_package'
  | 'all_access_offer'
  | 'membership'
  | 'unknown';

export interface MomencePriceEntry {
  value: number;
  currency: 'GBP';
  contentName: string;
  contentType: MomencePurchaseCategory;
}

export const MOMENCE_PRICING: Record<string, MomencePriceEntry> = {
  '488100': { value: 60,  currency: 'GBP', contentName: 'Reformer Pilates Intro 3 for £60',     contentType: 'intro_offer' },
  '507852': { value: 50,  currency: 'GBP', contentName: 'Hot Pilates Intro 3 for £50',           contentType: 'intro_offer' },
  '624096': { value: 65,  currency: 'GBP', contentName: 'Red Light Hot Pilates Intro 3 for £65', contentType: 'intro_offer' },
  '621480': { value: 60,  currency: 'GBP', contentName: 'Barre Intro 3 for £60',                 contentType: 'intro_offer' },
  '631782': { value: 70,  currency: 'GBP', contentName: 'Try All Intro 3 for £70',               contentType: 'intro_offer' },
  '708119': { value: 180, currency: 'GBP', contentName: 'Cadillac 1-1 Intro 3 for £180',         contentType: 'intro_offer' },
  '718403': { value: 180, currency: 'GBP', contentName: 'EMS Sculpt Intro 3 for £180',           contentType: 'intro_offer' },
  '776393': { value: 40,  currency: 'GBP', contentName: 'Belly Dance Intro 3 for £40',           contentType: 'intro_offer' },
  '872693': { value: 40,  currency: 'GBP', contentName: 'Guided Journaling Intro 3 for £40',     contentType: 'intro_offer' },
  '872694': { value: 60,  currency: 'GBP', contentName: 'Women\'s Circle Intro 3 for £60',       contentType: 'intro_offer' },

  '597174': { value: 65,  currency: 'GBP', contentName: 'Dance 4 Classes',                       contentType: 'dance_package' },
  '609496': { value: 90,  currency: 'GBP', contentName: 'Dance 8 Classes',                       contentType: 'dance_package' },

  '632399': { value: 84,  currency: 'GBP', contentName: 'All Access 4 Classes (limited offer)',  contentType: 'all_access_offer' },
  '632400': { value: 168, currency: 'GBP', contentName: 'All Access 8 Classes (limited offer)',  contentType: 'all_access_offer' },
  '632401': { value: 252, currency: 'GBP', contentName: 'All Access 12 Classes (limited offer)', contentType: 'all_access_offer' },


  '631785': { value: 100, currency: 'GBP', contentName: 'All Access Membership — 4 classes/mo',  contentType: 'membership' },
  '631786': { value: 170, currency: 'GBP', contentName: 'All Access Membership — 8 classes/mo',  contentType: 'membership' },
  '631788': { value: 240, currency: 'GBP', contentName: 'All Access Membership — 12 classes/mo', contentType: 'membership' },
  '631791': { value: 330, currency: 'GBP', contentName: 'All Access Membership — Unlimited',     contentType: 'membership' },

  '497869': { value: 80,  currency: 'GBP', contentName: 'Reformer Membership — 4 classes/mo',    contentType: 'membership' },
  '498245': { value: 155, currency: 'GBP', contentName: 'Reformer Membership — 8 classes/mo',    contentType: 'membership' },
  '498246': { value: 230, currency: 'GBP', contentName: 'Reformer Membership — 12 classes/mo',   contentType: 'membership' },
  '498247': { value: 290, currency: 'GBP', contentName: 'Reformer Membership — Unlimited',       contentType: 'membership' },

  '498688': { value: 70,  currency: 'GBP', contentName: 'Hot Pilates Membership — 4 classes/mo', contentType: 'membership' },
  '498691': { value: 130, currency: 'GBP', contentName: 'Hot Pilates Membership — 8 classes/mo', contentType: 'membership' },
  '498695': { value: 200, currency: 'GBP', contentName: 'Hot Pilates Membership — 12 classes/mo',contentType: 'membership' },
  '498697': { value: 260, currency: 'GBP', contentName: 'Hot Pilates Membership — Unlimited',    contentType: 'membership' },

  '540504': { value: 230, currency: 'GBP', contentName: 'Premium Membership — Tier 1',           contentType: 'membership' },
  '540503': { value: 430, currency: 'GBP', contentName: 'Premium Membership — Tier 2',           contentType: 'membership' },
  '540501': { value: 610, currency: 'GBP', contentName: 'Premium Membership — Tier 3',           contentType: 'membership' },

  '707775': { value: 60,  currency: 'GBP', contentName: 'Sculpt Mat Membership — 4 classes/mo',  contentType: 'membership' },
  '707776': { value: 120, currency: 'GBP', contentName: 'Sculpt Mat Membership — 8 classes/mo',  contentType: 'membership' },
  '707777': { value: 180, currency: 'GBP', contentName: 'Sculpt Mat Membership — 12 classes/mo', contentType: 'membership' },
  '707780': { value: 200, currency: 'GBP', contentName: 'Sculpt Mat Membership — Unlimited',     contentType: 'membership' },
  '707782': { value: 80,  currency: 'GBP', contentName: 'Sculpt Mat Membership — Special',       contentType: 'membership' },

  '597181': { value: 55,  currency: 'GBP', contentName: 'Dance Membership — 4 classes/mo',       contentType: 'membership' },
};

export function resolveMomenceId(id: string | null | undefined): MomencePriceEntry | null {
  if (!id) return null;
  const clean = String(id).trim();
  return MOMENCE_PRICING[clean] || null;
}

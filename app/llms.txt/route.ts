import {
  BF_BONUS_MONTHS,
  BF_END_DATE,
  BF_HAS_PLACEHOLDERS,
  BF_LINE,
  BF_MEMBERSHIPS,
  BF_NAME,
  BF_PACKAGES,
  BF_PACKAGE_EXTRA_CLASSES,
  BF_PATH,
  BF_UNLIMITED_GIFT,
  BF_UNLIMITED_GIFT_EVERY,
  blackFridayEnded,
} from '@/components/black-friday/offer';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { POLICIES, PRICING, SITE_URL, STUDIO } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /llms.txt — a plain-text summary of the business for AI tools.
 *
 * Generated from the same facts as the rest of the site (lib/site.ts,
 * lib/classes.ts) so prices and policies here can never drift out of date.
 */
export function GET() {
  const tiers = (list: readonly { name: string; price: number }[]) =>
    list.map((tier) => `${tier.name} £${tier.price}`).join(', ');

  // Black Friday: listed once its checkout links are in, and until a deploy after it ends
  const blackFriday =
    BF_HAS_PLACEHOLDERS || blackFridayEnded()
      ? ''
      : `
## Black Friday: ${BF_NAME}

- [${BF_NAME}](${SITE_URL}${BF_PATH}): ${BF_LINE} Ends ${BF_END_DATE}, UK time
- Euforyc Membership, same price, extra classes every month for the first ${BF_BONUS_MONTHS} months: ${BF_MEMBERSHIPS.filter((m) => m.classesWithBonus)
          .map((m) => `${m.plan.name} ${m.plan.classes} to ${m.classesWithBonus} classes a month`)
          .join(', ')}
- Euforyc Unlimited: ${BF_UNLIMITED_GIFT.charAt(0).toLowerCase()}${BF_UNLIMITED_GIFT.slice(1)}, ${BF_UNLIMITED_GIFT_EVERY}
- Class packages: buy an eligible class package and get ${BF_PACKAGE_EXTRA_CLASSES} extra class: ${BF_PACKAGES.map((offer) => `${offer.label} ${offer.option.name} £${offer.option.price}`).join(', ')}
- Existing members need to upgrade their membership to qualify
- The ${PRICING.introOffer.name} intro offer is not part of Black Friday
`;

  const body = `# ${STUDIO.name}

> ${STUDIO.shortDescription}

- Address: ${STUDIO.addressLine}
- Getting here: ${STUDIO.transport.station}. Buses ${STUDIO.transport.buses.join(', ')}
- Nearby areas: ${STUDIO.areas.join(', ')}
- Phone: ${STUDIO.phoneDisplay}
- Email: ${STUDIO.email}
- Opening hours: ${STUDIO.hours.map((period) => `${period.label} ${period.opens} to ${period.closes}`).join('; ')}
- Map: ${STUDIO.mapsUrl}
- Instagram: ${STUDIO.social.instagram}
- TikTok: ${STUDIO.social.tiktok}

## Classes

${ORDERED_CLASS_TYPES.map(
  (classType) => `- [${classType.name}](${SITE_URL}/classes/${classType.slug}): ${classType.summary} ${classType.slug.startsWith('private-') ? 'Single session' : 'Single class'} £${classType.price}.`
).join('\n')}

## Prices

- Drop-in group class: £${PRICING.dropIn.standard}. Sculpt Mat Pilates and Belly Dance: £${PRICING.dropIn.move}
- ${PRICING.introOffer.name} intro offer: ${PRICING.introOffer.classes} classes for £${PRICING.introOffer.price}. ${PRICING.introOffer.note}
- Euforyc Package: ${tiers(PRICING.euforycPackage.tiers)}. ${PRICING.euforycPackage.note}
- MOVE package: ${tiers(PRICING.movePackage.tiers)}. ${PRICING.movePackage.note}
- Euforyc Membership (per month): ${tiers(PRICING.membership.tiers)}. ${PRICING.membership.note}
- 1:1 Private Reformer Pilates: ${tiers(PRICING.privateSession.tiers)}. ${PRICING.privateSession.note}
- [Full price list](${SITE_URL}/pricing)
${blackFriday}
## Good to know

- ${POLICIES.womenOnly}
- ${POLICIES.gripSocks}
- ${POLICIES.towel}
- What to wear to Red Light Hot Mat Pilates: ${POLICIES.redLightWear}
- ${POLICIES.cancellation}
- ${POLICIES.arrival}

## Key pages

- [Class timetable](${SITE_URL}/schedule): live schedule for the next two weeks, with instructors and spaces left
- [All classes](${SITE_URL}/classes): every class type with what to expect
- [Client reviews](${SITE_URL}/reviews): written reviews left by clients after class
- [Class packages](${SITE_URL}/packages): Try It All intro offer, Euforyc Package and MOVE
- [Memberships](${SITE_URL}/memberships): monthly memberships and what each includes
- [FAQ](${SITE_URL}/faq): booking, cancellation, what to bring and pregnancy
- [Team](${SITE_URL}/team): the founders of Euforyc Studios
- [Contact and directions](${SITE_URL}/contact)
- [Studio hire](${SITE_URL}/studio-hire): private events and group Pilates, open to everyone
- [Gift cards](${SITE_URL}/gift-cards)

## Also at the same address

- [Euforyc Sips](${SITE_URL}/sips): matcha bar and wellness cafe serving ceremonial-grade matcha, specialty coffee, cold foam drinks and smoothies. Open to everyone, walk-ins welcome, with [click and collect ordering](${SITE_URL}/sips/order)
- [Euforyc Skin Studio](https://euforycskin.co.uk/): women-only aesthetic clinic offering dermal fillers, anti-wrinkle treatments, IV drips, skin boosters, body contouring and laser hair removal
- [Massage Ritual](${SITE_URL}/massage): 30, 60 and 90 minute massages

Website designed and built by Identeti (https://identeti.com).
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

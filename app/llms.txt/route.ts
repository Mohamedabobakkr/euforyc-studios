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
- 1:1 Private Reformer Pilates and 1:1 Private Cadillac Reformer Pilates: ${tiers(PRICING.privateSession.tiers)}. ${PRICING.privateSession.note}
- [Full price list](${SITE_URL}/pricing)

## Good to know

- ${POLICIES.womenOnly}
- ${POLICIES.gripSocks}
- ${POLICIES.towel}
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
- [Euforyc Skin Studio](${SITE_URL}/skin-studio): women-only aesthetic clinic offering dermal fillers, anti-wrinkle treatments, IV drips, skin boosters, body contouring and laser hair removal
- [Massage Ritual](${SITE_URL}/massage): 30, 60 and 90 minute massages
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

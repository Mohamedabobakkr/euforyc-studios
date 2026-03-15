import type { Metadata, Viewport } from 'next';

const siteUrl = 'https://euforyc.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Euforyc Sips | Matcha Bar & Wellness Cafe in Edgware, London',
    template: '%s | Euforyc Sips',
  },
  description: 'The best matcha bar and wellness cafe in North West London. Ceremonial matcha lattes with cold foam, specialty coffee, collagen smoothies & wellness drinks in Edgware. Laptop-friendly, community-focused cafe perfect for running clubs, remote work, post-workout fuel or just hanging out. Walk-ins welcome near Edgware Station.',
  keywords: [
    // Core — matcha bar
    'matcha bar london', 'best matcha london', 'matcha bar near me', 'matcha bar north london', 'matcha bar north west london', 'matcha bar edgware', 'matcha latte london', 'matcha latte edgware', 'matcha latte near me', 'ceremonial matcha london', 'ceremonial matcha latte london', 'best matcha latte london', 'matcha latte north london', 'matcha cafe london', 'iced matcha london', 'matcha cold foam london',
    // Core — coffee
    'specialty coffee edgware', 'best coffee edgware', 'coffee shop edgware', 'cold foam coffee london', 'best coffee north london', 'coffee shop near edgware station', 'specialty coffee north west london', 'latte art edgware',
    // Core — cafe / wellness
    'wellness cafe london', 'healthy cafe london', 'wellness cafe edgware', 'wellness cafe north london', 'wellness cafe north west london', 'healthy cafe edgware', 'healthy cafe north london', 'wellness drinks london', 'collagen smoothie london', 'protein smoothie edgware',
    // Location targeting — NW London boroughs
    'cafe edgware', 'best cafe edgware', 'coffee edgware', 'matcha edgware', 'cafe near edgware station', 'cafe barnet', 'coffee shop barnet', 'matcha bar barnet', 'cafe mill hill', 'coffee shop mill hill', 'cafe burnt oak', 'cafe colindale', 'cafe stanmore', 'coffee shop stanmore', 'matcha bar stanmore', 'cafe canons park', 'cafe queensbury', 'cafe harrow', 'matcha bar harrow', 'coffee shop harrow',
    // Community / lifestyle
    'running club cafe london', 'post workout cafe london', 'laptop friendly cafe london', 'laptop cafe edgware', 'study cafe london', 'work from cafe london', 'community cafe edgware', 'trendy cafe london', 'trendy cafe north london', 'aesthetic cafe london', 'instagram cafe london', 'cute cafe london',
    // Erewhon / brand comparison
    'erewhon style cafe london', 'erewhon london', 'wellness coffee shop london', 'healthy coffee shop london',
    // Near me / generic
    'best cafe near me', 'matcha near me', 'healthy drinks near me', 'smoothie bar near me', 'cafe near me north london',
  ],
  openGraph: {
    title: 'Euforyc Sips | Best Matcha Bar & Wellness Cafe in North West London',
    description: 'The trendiest matcha bar & wellness cafe in North West London. Ceremonial matcha lattes with cold foam, specialty coffee, collagen smoothies & wellness drinks in Edgware. Laptop-friendly, walk-ins welcome.',
    url: `${siteUrl}/sips`,
    siteName: 'Euforyc Sips',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: `${siteUrl}/logo.png`, width: 600, height: 600, alt: 'Euforyc Sips - Best Matcha Bar & Wellness Cafe in Edgware, North West London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Euforyc Sips | Best Matcha Bar & Wellness Cafe NW London',
    description: 'Ceremonial matcha lattes, specialty coffee with cold foam, collagen smoothies & wellness drinks in Edgware. The Erewhon of North London. Open to everyone.',
    site: '@euforycsips',
    images: [`${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${siteUrl}/sips`,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const sipsBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['CafeOrCoffeeShop', 'Restaurant', 'FoodEstablishment'],
  '@id': `${siteUrl}/sips/#business`,
  name: 'Euforyc Sips',
  alternateName: ['Euforyc Sips Matcha Bar', 'Euforyc Sips Wellness Cafe', 'Euforyc Matcha', 'Euforyc Coffee'],
  description: 'The best matcha bar and wellness cafe in North West London, Edgware. Serving ceremonial grade matcha lattes with cold foam, specialty coffee, collagen-boosted smoothies, and wellness drinks. A trendy community-focused space perfect for running clubs, remote work, post-workout fuel, studying, or just hanging out with friends. The Erewhon of North London.',
  url: `${siteUrl}/sips`,
  telephone: '+447375710370',
  email: 'euforyc@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7 Holmstall Ave',
    addressLocality: 'Edgware',
    addressRegion: 'London',
    postalCode: 'HA8 5HX',
    addressCountry: 'GB',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.6142, longitude: -0.2756 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:45', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '08:45', closes: '18:00' },
  ],
  priceRange: '£',
  servesCuisine: ['Matcha', 'Ceremonial Matcha', 'Specialty Coffee', 'Cold Foam Drinks', 'Wellness Smoothies', 'Collagen Smoothies', 'Healthy Drinks'],
  hasMenu: `${siteUrl}/sips/order`,
  acceptsReservations: false,
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay'],
  currenciesAccepted: 'GBP',
  image: `${siteUrl}/logo.png`,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    'https://www.instagram.com/euforycsips',
    'https://www.instagram.com/euforycstudios',
    'https://www.tiktok.com/@euforyc',
  ],
  areaServed: [
    { '@type': 'City', name: 'London' },
    { '@type': 'Place', name: 'North West London' },
    { '@type': 'Place', name: 'Edgware' },
    { '@type': 'Place', name: 'Barnet' },
    { '@type': 'Place', name: 'Mill Hill' },
    { '@type': 'Place', name: 'Finchley' },
    { '@type': 'Place', name: 'Burnt Oak' },
    { '@type': 'Place', name: 'Colindale' },
    { '@type': 'Place', name: 'Stanmore' },
    { '@type': 'Place', name: 'Canons Park' },
    { '@type': 'Place', name: 'Queensbury' },
    { '@type': 'Place', name: 'Harrow' },
    { '@type': 'Place', name: 'Hendon' },
    { '@type': 'Place', name: 'Kingsbury' },
    { '@type': 'Place', name: 'Wembley' },
  ],
  parentOrganization: { '@id': `${siteUrl}/#organization` },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Laptop Friendly', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Takeaway Available', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Dine In', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Click & Collect', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Walk-Ins Welcome', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Power Outlets Available', value: true },
  ],
  hasMap: 'https://maps.app.goo.gl/zZfyhD3X2BuS6SnL6',
  publicAccess: true,
  isAccessibleForFree: true,
  knowsAbout: [
    'Ceremonial Matcha',
    'Matcha Latte',
    'Cold Foam',
    'Specialty Coffee',
    'Wellness Drinks',
    'Collagen Smoothies',
    'Healthy Living',
    'Post-Workout Nutrition',
    'Community Cafe Culture',
  ],
};

const sipsMenuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': `${siteUrl}/sips/#menu`,
  name: 'Euforyc Sips Menu',
  description: 'Full menu of ceremonial matcha, specialty coffee, collagen smoothies, and wellness drinks at Euforyc Sips in Edgware, North West London.',
  url: `${siteUrl}/sips/order`,
  hasMenuSection: [
    {
      '@type': 'MenuSection',
      name: 'Matcha',
      description: 'Ceremonial grade matcha lattes with cold foam — the best matcha in North West London',
      hasMenuItem: [
        { '@type': 'MenuItem', name: 'Ceremonial Matcha Latte', description: 'Premium ceremonial grade matcha with your choice of milk and cold foam topping. The signature drink of Euforyc Sips.' },
        { '@type': 'MenuItem', name: 'Iced Matcha Latte', description: 'Refreshing iced ceremonial matcha with cold foam — perfect for hot days' },
        { '@type': 'MenuItem', name: 'Coco Cloud Matcha', description: 'Hydrating, earthy and dreamy — ceremonial grade matcha with coconut cloud foam. Fan favourite and trending drink.' },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Coffee',
      description: 'Specialty espresso drinks with cold foam — bold, bright and quietly sophisticated',
      hasMenuItem: [
        { '@type': 'MenuItem', name: 'Specialty Latte', description: 'Expertly crafted coffee latte with cold foam options' },
        { '@type': 'MenuItem', name: 'Iced Coffee', description: 'Cold brew style coffee with cold foam' },
        { '@type': 'MenuItem', name: 'Espresso', description: 'Bold specialty espresso shot' },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Wellness Smoothies',
      description: 'Collagen-boosted, organic wellness blends crafted to help you glow from the inside out',
      hasMenuItem: [
        { '@type': 'MenuItem', name: 'Euforyc Pink Glow', description: 'Your daily beauty ritual in a glass — antioxidant-rich and collagen-boosted smoothie to help you glow from the inside out. Fan favourite and trending drink.' },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Secret Menu',
      description: 'Exclusive secret menu drinks — ask about our rotating seasonal specials',
      url: `${siteUrl}/sips/secret-menu`,
    },
  ],
};

const sipsFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where is the best matcha bar in North West London?',
      acceptedAnswer: { '@type': 'Answer', text: 'Euforyc Sips is the best matcha bar in North West London, located at 7 Holmstall Ave, Edgware HA8 5HX. We serve ceremonial grade matcha lattes with cold foam, specialty coffee, collagen smoothies, and wellness drinks. We are near Edgware Station on the Northern Line and open Monday-Friday 6:45am-8pm, Saturday-Sunday 8:45am-6pm.' },
    },
    {
      '@type': 'Question',
      name: 'What does Euforyc Sips serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'Euforyc Sips serves ceremonial grade matcha lattes with cold foam, specialty coffee drinks, collagen-boosted wellness smoothies, iced matcha, iced coffee, and a rotating secret menu. Our most popular drinks are the Coco Cloud Matcha and the Euforyc Pink Glow smoothie. Everything is crafted for wellness and tastes amazing.' },
    },
    {
      '@type': 'Question',
      name: 'Is Euforyc Sips good for working on a laptop?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! Euforyc Sips is one of the best laptop-friendly cafes in Edgware and North West London. We have free Wi-Fi, power outlets, comfortable seating, and a relaxed atmosphere perfect for remote work, studying, or creative work. Many of our customers come to work for hours with their favourite matcha or coffee.' },
    },
    {
      '@type': 'Question',
      name: 'Can I order ahead at Euforyc Sips?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! You can order your drinks online at euforyc.co.uk/sips/order and pick them up when you arrive — no waiting, just vibes. Walk-ins are always welcome too.' },
    },
    {
      '@type': 'Question',
      name: 'Is Euforyc Sips women only?',
      acceptedAnswer: { '@type': 'Answer', text: 'No, Euforyc Sips is open to everyone! While Euforyc Studios (the pilates studio) is women-only, the Sips cafe welcomes everyone — men, women, families, friends, running clubs, remote workers, students, and anyone who loves great matcha and coffee.' },
    },
    {
      '@type': 'Question',
      name: 'Where is the best cafe near Edgware Station?',
      acceptedAnswer: { '@type': 'Answer', text: 'Euforyc Sips is the best cafe near Edgware Station, located just a short walk away at 7 Holmstall Ave, Edgware HA8 5HX. We serve the best ceremonial matcha and specialty coffee in the area, with a trendy, community-focused atmosphere.' },
    },
    {
      '@type': 'Question',
      name: 'What is the best coffee shop in Edgware?',
      acceptedAnswer: { '@type': 'Answer', text: 'Euforyc Sips is the best coffee shop in Edgware, offering specialty coffee with cold foam, ceremonial matcha lattes, collagen smoothies, and wellness drinks. Located at 7 Holmstall Ave near Edgware Station, it is a laptop-friendly, community-focused space with free Wi-Fi.' },
    },
  ],
};

export default function SipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sipsBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sipsMenuSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sipsFAQSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

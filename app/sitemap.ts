import { MetadataRoute } from 'next';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { SITE_URL } from '@/lib/site';

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

interface Page {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  images?: string[];
}

const image = (path: string) => `${SITE_URL}${path}`;

const pages: Page[] = [
  {
    path: '',
    changeFrequency: 'weekly',
    priority: 1,
    images: [
      image('/og/euforyc-studios-shopfront-edgware.jpg'),
      image('/og/euforyc-studios-reformer-studio-edgware.jpg'),
    ],
  },
  { path: '/classes', changeFrequency: 'weekly', priority: 0.9 },
  ...ORDERED_CLASS_TYPES.map((classType) => ({
    path: `/classes/${classType.slug}`,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.9,
    images: [image(classType.image.src)],
  })),
  { path: '/schedule', changeFrequency: 'daily', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/packages', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/memberships', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/reviews', changeFrequency: 'daily', priority: 0.8 },
  { path: '/book', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/offers', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/packages-memberships', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/team', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/studio-hire', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/massage', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/gift-cards', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/shop', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/sips', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/sips/menu', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sips/order', changeFrequency: 'daily', priority: 0.8 },
  { path: '/sips/secret-menu', changeFrequency: 'weekly', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Stamped once per deployment, so lastmod reflects when the site last changed
  const lastModified = new Date();

  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(page.images ? { images: page.images } : {}),
  }));
}

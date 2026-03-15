import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/packages',
          '/memberships',
          '/about',
          '/book',
          '/contact',
          '/sips',
          '/skin-studio',
          '/schedule',
          '/pricing',
          '/faq',
          '/teachers',
          '/gift-cards',
          '/offers',
        ],
        disallow: ['/admin', '/_next/', '/api/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: 'https://euforyc.co.uk/sitemap.xml',
  };
}

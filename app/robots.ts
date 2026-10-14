import { MetadataRoute } from 'next';

/**
 * One rule set for every crawler, search and AI alike.
 *
 * A crawler that has its own named group ignores the "*" group entirely, so
 * naming bots individually only creates gaps. Nothing under /_next/ is
 * blocked: that is where the site's images, CSS and JavaScript are served.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://euforyc.co.uk/sitemap.xml',
  };
}

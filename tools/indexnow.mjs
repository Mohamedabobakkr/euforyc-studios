/**
 * Tells Bing (and the other IndexNow search engines) which pages changed, so
 * they re-crawl within minutes instead of days. Bing's index feeds Microsoft
 * Copilot and is one of the sources ChatGPT search draws on.
 *
 * Run after a production deploy that changes page content:
 *   npm run indexnow                  submit every URL in the live sitemap
 *   npm run indexnow -- /pricing /faq submit only these paths
 */
const HOST = 'euforyc.co.uk';
const KEY = '5a8fadceb6ebffa7261dae4a039bab96';
const ORIGIN = `https://${HOST}`;

async function sitemapUrls() {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

const paths = process.argv.slice(2);
const urlList = paths.length > 0 ? paths.map((path) => `${ORIGIN}${path}`) : await sitemapUrls();

const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyCheck.ok) {
  console.error(`Key file is not live yet at ${ORIGIN}/${KEY}.txt — deploy first, then run this again.`);
  process.exit(1);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});

console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${response.status}`);
if (!response.ok) process.exit(1);

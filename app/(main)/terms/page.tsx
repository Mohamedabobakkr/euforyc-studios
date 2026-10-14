import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service and copyright information for the Euforyc Studios website.',
  path: '/terms',
});

export default function Terms() {
  return (
    <div className="eu-page-top">
      <section className="eu-wrap pb-[clamp(80px,10vw,150px)] pt-[clamp(48px,6vw,96px)]">
        <div>
          <h1 className="eu-h1 eu-fade-in !mb-[clamp(40px,5vw,72px)]">
            Terms of <em>Service</em>
          </h1>
          
          <div className="max-w-3xl space-y-0 lg:ml-[calc(100%/3)]">
            <div className="space-y-4 border-t border-[#1a260e]/15 py-10">
              <h2 className="heading-tertiary">Copyright and Intellectual Property</h2>
              <p className="body-text">
                All content, design, graphics, layout, and code of the Euforyc Studios website is protected by copyright and intellectual property laws.
                The content may not be copied, reproduced, modified, published, uploaded, posted, transmitted, or distributed in any way without express written permission from Euforyc Studios.
              </p>
              <p className="body-text">
                The Euforyc Studios name, logo, and distinctive visual design are trademarks of Euforyc Studios. Our website's appearance, including its color scheme, layout, and styling, constitute our trade dress and are protected by relevant intellectual property laws.
              </p>
            </div>
            
            <div className="space-y-4 border-t border-[#1a260e]/15 py-10">
              <h2 className="heading-tertiary">Prohibited Activities</h2>
              <p className="body-text">
                You may not engage in any of the following activities:
              </p>
              <ul className="body-text list-disc space-y-2 pl-6 marker:text-eu-sage">
                <li>Copying, distributing, or disclosing any part of our website in any medium</li>
                <li>Using our design, layout, or visual elements for any commercial purpose</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or proprietary notices from materials found on this site</li>
                <li>Creating derivative works based on the content or design of our website</li>
              </ul>
            </div>
            
            <div className="space-y-4 border-y border-[#1a260e]/15 py-10">
              <h2 className="heading-tertiary">Legal Actions</h2>
              <p className="body-text">
                Euforyc Studios reserves the right to take appropriate legal action against any individuals or entities found to be infringing upon our copyrights or intellectual property rights. This may include seeking injunctive relief, damages, and recovery of legal costs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Euforyc Studios',
  description: 'Terms of Service and copyright information for Euforyc Studios website.',
};

export default function Terms() {
  return (
    <div className="pt-32">
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width">
          <h1 className="heading-primary mb-6">Terms of Service</h1>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h2 className="heading-tertiary">Copyright and Intellectual Property</h2>
              <p className="body-text">
                All content, design, graphics, layout, and code of the Euforyc Studios website is protected by copyright and intellectual property laws.
                The content may not be copied, reproduced, modified, published, uploaded, posted, transmitted, or distributed in any way without express written permission from Euforyc Studios.
              </p>
              <p className="body-text">
                The Euforyc Studios name, logo, and distinctive visual design are trademarks of Euforyc Studios. Our website's appearance, including its color scheme, layout, and styling, constitute our trade dress and are protected by relevant intellectual property laws.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="heading-tertiary">Prohibited Activities</h2>
              <p className="body-text">
                You may not engage in any of the following activities:
              </p>
              <ul className="list-disc pl-6 space-y-2 body-text">
                <li>Copying, distributing, or disclosing any part of our website in any medium</li>
                <li>Using our design, layout, or visual elements for any commercial purpose</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or proprietary notices from materials found on this site</li>
                <li>Creating derivative works based on the content or design of our website</li>
              </ul>
            </div>
            
            <div className="space-y-4">
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
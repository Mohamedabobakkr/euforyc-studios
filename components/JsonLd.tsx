/**
 * Renders schema.org structured data. "<" is escaped so text that originates
 * outside the codebase (class descriptions from Momence) can never close the
 * script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

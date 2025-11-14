import type { Person } from 'schema-dts';

import { SITE_BASE_URL } from '@/config';
import { RenderStructuredData } from '@/features/search-engines/components/render-structured-data';

export function MeStructuredData() {
  return (
    <RenderStructuredData<Person>
      data={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://pierregueroult.dev/#me',
        name: 'Pierre Guéroult',
        url: SITE_BASE_URL,
        jobTitle: 'Software and Artificial Intelligence Engineer',
        nationality: {
          '@type': 'Country',
          name: 'France',
        },
        email: 'mailto:contact@pierregueroult.dev',
        sameAs: [
          'https://www.linkedin.com/in/pierregueroult',
          'https://github.com/pierregueroult',
          'https://x.com/pierregueroult1',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Paris',
          addressRegion: 'Ile-de-France',
          addressCountry: 'France',
        },
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'ESIEE Paris Engineering School',
            alternateName: 'Université Gustave Eiffel',
            url: 'https://www.esiee.fr/',
          },
          {
            '@type': 'CollegeOrUniversity',
            name: 'Institut Universitaire de technologie de Rouen',
            url: 'https://iutrouen.univ-rouen.fr/',
          },
        ],
        knowsLanguage: [
          {
            '@type': 'Language',
            name: 'English',
            alternateName: 'EN',
            description: 'Fluent English speaker',
          },
          {
            '@type': 'Language',
            name: 'French',
            alternateName: 'FR',
            description: 'Native French speaker',
          },
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Altelis',
          url: 'https://www.altelis.com',
        },
      }}
    />
  );
}

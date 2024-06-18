import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Births from '~/app/birthdays/[MM]/[DD]/births';
import { BirthType } from '~/types/BirthdayTypes';

jest.mock('~/components/BirthdaysTable', () => (props: { data: BirthType[] }) => (
  <div data-testid="birthdays-table">
    {props.data.map((birth, index) => (
      <div key={index}>{birth.text}</div>
    ))}
  </div>
));

describe('Births', () => {
  const mockBirths: BirthType[] = [
    {
      text: 'Person One, American actor',
      year: 1980,
      pages: [
        {
          type: 'standard',
          title: 'Person_One',
          displaytitle: 'Person One',
          namespace: { id: 0, text: '' },
          wikibase_item: 'Q123456',
          titles: {
            canonical: 'Person_One',
            normalized: 'Person One',
            display: 'Person One'
          },
          pageid: 1,
          thumbnail: {
            source: 'https://example.com/person_one.jpg',
            width: 320,
            height: 480
          },
          originalimage: {
            source: 'https://example.com/person_one_large.jpg',
            width: 2124,
            height: 3187
          },
          lang: 'en',
          dir: 'ltr',
          revision: '123456',
          tid: '123456',
          timestamp: '2024-04-25T18:48:48Z',
          description: 'American actor',
          description_source: 'local',
          content_urls: {
            desktop: {
              page: 'https://en.wikipedia.org/wiki/Person_One',
              revisions: 'https://en.wikipedia.org/wiki/Person_One?action=history',
              edit: 'https://en.wikipedia.org/wiki/Person_One?action=edit',
              talk: 'https://en.wikipedia.org/wiki/Talk:Person_One'
            },
            mobile: {
              page: 'https://en.m.wikipedia.org/wiki/Person_One',
              revisions: 'https://en.m.wikipedia.org/wiki/Special:History/Person_One',
              edit: 'https://en.m.wikipedia.org/wiki/Person_One?action=edit',
              talk: 'https://en.m.wikipedia.org/wiki/Talk:Person_One'
            }
          },
          extract: 'Person One is an American actor.',
          extract_html: '<p><b>Person One</b> is an American actor.</p>',
          normalizedtitle: 'Person One'
        }
      ]
    },
    {
      text: 'Person Two, British scientist',
      year: 1975,
      pages: [
        {
          type: 'standard',
          title: 'Person_Two',
          displaytitle: 'Person Two',
          namespace: { id: 0, text: '' },
          wikibase_item: 'Q654321',
          titles: {
            canonical: 'Person_Two',
            normalized: 'Person Two',
            display: 'Person Two'
          },
          pageid: 2,
          thumbnail: {
            source: 'https://example.com/person_two.jpg',
            width: 320,
            height: 480
          },
          originalimage: {
            source: 'https://example.com/person_two_large.jpg',
            width: 2124,
            height: 3187
          },
          lang: 'en',
          dir: 'ltr',
          revision: '654321',
          tid: '654321',
          timestamp: '2024-04-25T18:48:48Z',
          description: 'British scientist',
          description_source: 'local',
          content_urls: {
            desktop: {
              page: 'https://en.wikipedia.org/wiki/Person_Two',
              revisions: 'https://en.wikipedia.org/wiki/Person_Two?action=history',
              edit: 'https://en.wikipedia.org/wiki/Person_Two?action=edit',
              talk: 'https://en.wikipedia.org/wiki/Talk:Person_Two'
            },
            mobile: {
              page: 'https://en.m.wikipedia.org/wiki/Person_Two',
              revisions: 'https://en.m.wikipedia.org/wiki/Special:History/Person_Two',
              edit: 'https://en.m.wikipedia.org/wiki/Person_Two?action=edit',
              talk: 'https://en.m.wikipedia.org/wiki/Talk:Person_Two'
            }
          },
          extract: 'Person Two is a British scientist.',
          extract_html: '<p><b>Person Two</b> is a British scientist.</p>',
          normalizedtitle: 'Person Two'
        }
      ]
    }
  ];

  it('should render without crashing', () => {
    render(<Births births={mockBirths} />);
  });

  it('renders the BirthdaysTable component with correct data', () => {
    render(<Births births={mockBirths} />);

    const table = screen.getByTestId('birthdays-table');
    expect(table).toBeInTheDocument();

    mockBirths.forEach(birth => {
      expect(screen.getByText(birth.text)).toBeInTheDocument();
    });
  });
});

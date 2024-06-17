import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BirthdaysTable from '~/components/BirthdaysTable';
import { BirthType } from '~/types/BirthdayTypes';

const sampleData: BirthType[] = [
  {
    year: 2000,
    text: 'Katrina Scott, American tennis player',
    pages: [
      {
        type: 'standard',
        title: 'Katrina_Scott',
        displaytitle: '<span class="mw-page-title-main">Katrina Scott</span>',
        namespace: { id: 0, text: '' },
        wikibase_item: 'Q66494826',
        titles: { canonical: 'Katrina_Scott', normalized: 'Katrina Scott', display: '<span class="mw-page-title-main">Katrina Scott</span>' },
        pageid: 65188750,
        thumbnail: { source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Scott_RGQ23.jpg/320px-Scott_RGQ23.jpg', width: 320, height: 480 },
        originalimage: { source: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Scott_RGQ23.jpg', width: 2124, height: 3187 },
        lang: 'en',
        dir: 'ltr',
        revision: '1220756571',
        tid: '73566b70-0334-11ef-b4a8-0820cc02292d',
        timestamp: '2024-04-25T18:48:48Z',
        description: 'American tennis player',
        description_source: 'local',
        content_urls: {
          desktop: { page: 'https://en.wikipedia.org/wiki/Katrina_Scott', revisions: 'https://en.wikipedia.org/wiki/Katrina_Scott?action=history', edit: 'https://en.wikipedia.org/wiki/Katrina_Scott?action=edit', talk: 'https://en.wikipedia.org/wiki/Talk:Katrina_Scott' },
          mobile: { page: 'https://en.m.wikipedia.org/wiki/Katrina_Scott', revisions: 'https://en.m.wikipedia.org/wiki/Special:History/Katrina_Scott', edit: 'https://en.m.wikipedia.org/wiki/Katrina_Scott?action=edit', talk: 'https://en.m.wikipedia.org/wiki/Talk:Katrina_Scott' },
        },
        extract: 'Katrina Scott is an American tennis player.',
        extract_html: '<p><b>Katrina Scott</b> is an American tennis player.</p>',
        normalizedtitle: 'Katrina Scott',
      },
    ],
  },
  {
    year: 1990,
    text: 'Jane Doe, Sample person',
    pages: [
      {
        type: 'standard',
        title: 'Jane_Doe',
        displaytitle: '<span class="mw-page-title-main">Jane Doe</span>',
        namespace: { id: 0, text: '' },
        wikibase_item: 'Q12345678',
        titles: { canonical: 'Jane_Doe', normalized: 'Jane Doe', display: '<span class="mw-page-title-main">Jane Doe</span>' },
        pageid: 12345678,
        thumbnail: { source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Jane_Doe.jpg/320px-Jane_Doe.jpg', width: 320, height: 480 },
        originalimage: { source: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Jane_Doe.jpg', width: 2124, height: 3187 },
        lang: 'en',
        dir: 'ltr',
        revision: '1220756572',
        tid: '73566b70-0334-11ef-b4a8-0820cc02292e',
        timestamp: '2024-04-25T18:48:49Z',
        description: 'Sample person',
        description_source: 'local',
        content_urls: {
          desktop: { page: 'https://en.wikipedia.org/wiki/Jane_Doe', revisions: 'https://en.wikipedia.org/wiki/Jane_Doe?action=history', edit: 'https://en.wikipedia.org/wiki/Jane_Doe?action=edit', talk: 'https://en.wikipedia.org/wiki/Talk:Jane_Doe' },
          mobile: { page: 'https://en.m.wikipedia.org/wiki/Jane_Doe', revisions: 'https://en.m.wikipedia.org/wiki/Special:History/Jane_Doe', edit: 'https://en.m.wikipedia.org/wiki/Jane_Doe?action=edit', talk: 'https://en.m.wikipedia.org/wiki/Talk:Jane_Doe' },
        },
        extract: 'Jane Doe is a sample person.',
        extract_html: '<p><b>Jane Doe</b> is a sample person.</p>',
        normalizedtitle: 'Jane Doe',
      },
    ],
  },
];

describe('BirthdaysTable', () => {
  it('renders table headers correctly', () => {
    render(<BirthdaysTable data={sampleData} />);

    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders table rows with data correctly', () => {
    render(<BirthdaysTable data={sampleData} />);

    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('Katrina Scott, American tennis player')).toBeInTheDocument();
    expect(screen.getByText('American tennis player')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe, Sample person')).toBeInTheDocument();
    expect(screen.getByText('Sample person')).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<BirthdaysTable data={sampleData} />);

    const katrinaLink = screen.getByText('Katrina Scott, American tennis player').closest('a');
    expect(katrinaLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Katrina_Scott');
    const janeLink = screen.getByText('Jane Doe, Sample person').closest('a');
    expect(janeLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Jane_Doe');
  });

  it('handles sorting when header is clicked', async () => {
    render(<BirthdaysTable data={sampleData} />);

    const yearHeader = screen.getByText('Year');
    await userEvent.click(yearHeader); // Sort ascending
    await userEvent.click(yearHeader); // Sort descending

    const rows = screen.getAllByRole('row');
    const firstRow = rows[1];
    const secondRow = rows[2];

    waitFor(() => {
      expect(firstRow).toHaveTextContent('2000');
      expect(secondRow).toHaveTextContent('1990');
    });
  });

  it('sorts the data in ascending order when the year header is clicked once', () => {
    render(<BirthdaysTable data={sampleData} />);

    const yearHeader = screen.getByText('Year');
    userEvent.click(yearHeader); // Sort ascending

    const rows = screen.getAllByRole('row');
    const firstRow = rows[1];
    const secondRow = rows[2];

    expect(firstRow).toHaveTextContent('1990');
    expect(secondRow).toHaveTextContent('2000');
  });

  it('sorts the data in descending order when the year header is clicked twice', async () => {
    render(<BirthdaysTable data={sampleData} />);

    const yearHeader = screen.getByText('Year');
    await userEvent.click(yearHeader); // Sort ascending
    await userEvent.click(yearHeader); // Sort descending

    const rows = screen.getAllByRole('row');
    const firstRow = rows[1];
    const secondRow = rows[2];

    waitFor(() => {
      expect(firstRow).toHaveTextContent('2000');
      expect(secondRow).toHaveTextContent('1990');
    })
  })
})

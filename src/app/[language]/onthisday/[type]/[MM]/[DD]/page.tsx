import React from "react";

interface OnThisDayPageProps {
  params: {
    language: string;
    type: string;
    MM: string;
    DD: string;
  }
}

interface WikipediaApiResponse {
  births: Birth[];
}

interface Birth {
  text: string;
  pages: Page[];
}

interface Page {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace;
  wikibase_item: string;
  titles: Titles;
  pageid: number;
  thumbnail?: Image;
  originalimage?: Image;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface Namespace {
  id: number;
  text: string;
}

interface Titles {
  canonical: string;
  normalized: string;
  display: string;
}

interface Image {
  source: string;
  width: number;
  height: number;
}

interface ContentUrls {
  desktop: PlatformUrls;
  mobile: PlatformUrls;
}

interface PlatformUrls {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

async function getTodayInHistory({
  params: {
    language,
    type,
    MM,
    DD,
  }
}: OnThisDayPageProps) {
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/${type}/${MM}/${DD}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.WIKIPEDIA_ACCESS_TOKEN}`,
      'Api-User-Agent': `${process.env.WIKIPEDIA_APP_NAME}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json() as WikipediaApiResponse;
  return data;
}


const OnThisDayPage: React.FC<OnThisDayPageProps> = async ({ params }) => {
  let data;
  try {
    data = await getTodayInHistory({ params });
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }

  return (
    <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <React.Suspense fallback={<div>Loading...</div>}>
        <div>
          <h1>Today in History</h1>
          {/* <span>{JSON.stringify(data)}</span> */}
          <ul>
            {data.births.map((birth) => (
              <li key={birth.text}>
                <a href={`/en/onthisday/birth/${birth.pages[0]?.title}`}>
                  {birth.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </React.Suspense>
    </main>
  )
};

export default OnThisDayPage;

// {
//   births: [
//     {
//       "text": "Katrina Scott, American tennis player",
//       "pages": [
//         {
//           "type": "standard",
//           "title": "Katrina_Scott",
//           "displaytitle": "<span class=\"mw-page-title-main\">Katrina Scott</span>",
//           "namespace": {
//             "id": 0,
//             "text": ""
//           },
//           "wikibase_item": "Q66494826",
//           "titles": {
//             "canonical": "Katrina_Scott",
//             "normalized": "Katrina Scott",
//             "display": "<span class=\"mw-page-title-main\">Katrina Scott</span>"
//           },
//           "pageid": 65188750,
//           "thumbnail": {
//             "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Scott_RGQ23.jpg/320px-Scott_RGQ23.jpg",
//             "width": 320,
//             "height": 480
//           },
//           "originalimage": {
//             "source": "https://upload.wikimedia.org/wikipedia/commons/1/18/Scott_RGQ23.jpg",
//             "width": 2124,
//             "height": 3187
//           },
//           "lang": "en",
//           "dir": "ltr",
//           "revision": "1220756571",
//           "tid": "73566b70-0334-11ef-b4a8-0820cc02292d",
//           "timestamp": "2024-04-25T18:48:48Z",
//           "description": "American tennis player",
//           "description_source": "local",
//           "content_urls": {
//             "desktop": {
//               "page": "https://en.wikipedia.org/wiki/Katrina_Scott",
//               "revisions": "https://en.wikipedia.org/wiki/Katrina_Scott?action=history",
//               "edit": "https://en.wikipedia.org/wiki/Katrina_Scott?action=edit",
//               "talk": "https://en.wikipedia.org/wiki/Talk:Katrina_Scott"
//             },
//             "mobile": {
//               "page": "https://en.m.wikipedia.org/wiki/Katrina_Scott",
//               "revisions": "https://en.m.wikipedia.org/wiki/Special:History/Katrina_Scott",
//               "edit": "https://en.m.wikipedia.org/wiki/Katrina_Scott?action=edit",
//               "talk": "https://en.m.wikipedia.org/wiki/Talk:Katrina_Scott"
//             }
//           },
//           "extract": "Katrina Scott is an American tennis player.",
//           "extract_html": "<p><b>Katrina Scott</b> is an American tennis player.</p>",
//           "normalizedtitle": "Katrina Scott"
//         },
//       ]
//     }
//   ]
// }
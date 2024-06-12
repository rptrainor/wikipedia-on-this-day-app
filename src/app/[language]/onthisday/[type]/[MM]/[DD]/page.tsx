"use client";

import React from "react";
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { type OnThisDayPageProps } from "~/features/wikipedia/births/types";
import { getDateInfo } from "~/features/wikipedia/utilities";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);


const OnThisDayPage: React.FC<OnThisDayPageProps> = ({ params }) => {
  const { month, dayWithSuffix } = getDateInfo(parseInt(params.DD), parseInt(params.MM));
  return (
    <QueryClientProvider client={queryClient}>

      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <div>
            <h1>Who was born on the {dayWithSuffix} of {month}?</h1>
            {/* <ul>
            {data.births.map((birth) => (
              <li key={birth.text}>
                <a href={`/en/onthisday/birth/${birth.pages[0]?.title}`}>
                  {birth.text}
                </a>
              </li>
            ))}
          </ul> */}
          </div>
        </div>
      </main>
    </QueryClientProvider>
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
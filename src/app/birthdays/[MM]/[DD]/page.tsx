import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import Births from './births'
import fetchBirths from '~/server/actions/fetchBirths'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  const today = new Date();
  const MM = String(today.getMonth() + 1).padStart(2, '0');
  const DD = String(today.getDate()).padStart(2, '0');

  await queryClient.prefetchQuery({
    queryKey: ['births'],
    queryFn: () => fetchBirths({ MM, DD }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Births />
    </HydrationBoundary>
  )
}

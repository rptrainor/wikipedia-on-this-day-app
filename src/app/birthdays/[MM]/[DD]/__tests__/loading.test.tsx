import { render } from '@testing-library/react';
import { Suspense } from 'react';

import Loading from '~/app/birthdays/[MM]/[DD]/loading';

it('should render without crashing', async () => {
  render(<Suspense fallback={<Loading />}><div>Test Child</div></Suspense>);
});
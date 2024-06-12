import { type NextRequest, NextResponse } from 'next/server';

import { getTodayInHistory } from '~/features/wikipedia/utilities';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language');
  const type = searchParams.get('type');
  const MM = searchParams.get('MM');
  const DD = searchParams.get('DD');

  if (!language || !type || !MM || !DD) {
    return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
  }

  try {
    const data = await getTodayInHistory({ language, type, MM, DD });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

import { GlobalErrorContent } from '~/components/GlobalErrorContent';

//* GlobalErrorContent is exported here because testing library does not support testing a page with an <html> tag but the this global error component needs rendered inside the <html> tag.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head title="Wikipedia on this day app" />
      <body>
        <GlobalErrorContent error={error} reset={reset} />
      </body>
    </html>
  );
}

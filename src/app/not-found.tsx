import NotFoundContent from "~/components/NotFoundContent";

//* NotFoundContent is made into a seperate component because testing library does not support testing a page with an <html> tag but the NextJs global error component is rendered inside the <html> tag.
function NotFound() {
  return (
    <html lang='en'>
      <head title='Wikipedia on this day app' />
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}

export default NotFound;

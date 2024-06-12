type OnThisDayPageProps = {
  params: {
    language: string;
    type: string;
    MM: string;
    DD: string;
  }
}

const OnThisDayPage: React.FC<OnThisDayPageProps> = ({ params }) => {
  return (
    <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-4xl font-bold">
        Props: {params.language} {params.type} {params.MM} {params.DD}
      </h1>
    </main>
  );
};

export default OnThisDayPage;
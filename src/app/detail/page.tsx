import Search from "./Search";

export function generateStaticParams() {
  return [{ slug: ["a", "1"] }, { slug: ["b", "2"] }, { slug: ["c", "3"] }];
}

interface Props {
  params: {
    id: string;
  };
}

export default function Page() {
  return (
    <>
      <Search />
    </>
  );
}

import { useRouter } from "next/router";
import { Suspense } from "react";
// import Search from "./Search";

type IProps = {
  params: { slug: string };
};

function SearchBarFallback() {
  return <>loading...</>;
}
export default function Page() {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <div>
        <Suspense fallback={<SearchBarFallback />}>
          {/* <Search /> */}
          <div>Search</div>
        </Suspense>
      </div>
    </>
  );
}

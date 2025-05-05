import { SearchBar } from "@/components/Search";
import { SearchProvider } from "@/util/context/searchContext";
import { Cards } from "@/components/Card";

export default function Home() {
  return (
    <SearchProvider>
      <SearchBar />
      <Cards />
    </SearchProvider>
  );
}

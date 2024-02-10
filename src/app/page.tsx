import { SearchBar } from "@/components/Search";
import { SearchProvider } from "./lib/context/searchContext";
import { Cards } from "./components/Card";

export default function Home() {
  return (
    <SearchProvider>
      <SearchBar />
      <Cards />
    </SearchProvider>
  );
}

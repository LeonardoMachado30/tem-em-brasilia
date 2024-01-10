import { SearchBar } from "@/components/Search";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchProvider } from "./lib/context/searchContext";
import { ListAllCompanies } from "@/components/Card";

export default function Home() {
  return (
    <main>
      <Header />
      <SearchProvider>
        <SearchBar />
        <ListAllCompanies />
      </SearchProvider>
      <Footer />
    </main>
  );
}

import { Search } from "@/components/Search";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchProvider } from "./lib/context/searchContext";
import { ListAllCompanies } from "./components/Card";
import { FirebaseServices } from "./firebase/FirebaseServices";

export default function Home() {
  return (
    <main>
      <Header />
      <SearchProvider>
        <Search />
        <ListAllCompanies />
      </SearchProvider>

      <Footer />
    </main>
  );
}

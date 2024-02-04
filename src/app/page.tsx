import { SearchBar } from "@/components/Search";
import { SearchProvider } from "./lib/context/searchContext";
import { ListAllCompanies } from "@/components/Card";
import { FirebaseServices } from "./firebase/FirebaseServices";

export default function Home() {
  return (
    <FirebaseServices>
      <SearchProvider>
        <SearchBar />
        <ListAllCompanies />
      </SearchProvider>
    </FirebaseServices>
  );
}

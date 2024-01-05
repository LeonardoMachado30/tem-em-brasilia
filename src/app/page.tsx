import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />

      <Search />

      <List />

      <Footer />
    </main>
  );
}

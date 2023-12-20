import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { FirebaseServices } from "./firebase/config";
import { Alert } from "./lib/context/alertContexct";

export default function Home() {
  return (
    <main className="relative flex flex-col gap-4 items-center justify-center max-w-[1420px] mx-auto top-40 w-full m-2 p-4">
      {/* <FirebaseServices> */}
        <Alert>
          <Search />
          <List />
        </Alert>
      {/* </FirebaseServices> */}
    </main>
  );
}

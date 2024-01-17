import { FirebaseServices } from "@/app/firebase/FirebaseServices";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import ViewEmployer from "@/app/detail/ViewEmployer";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <FirebaseServices>
        <Header />
        <ViewEmployer params={params} />
        <Footer />
      </FirebaseServices>
    </>
  );
}

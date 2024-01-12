import { Suspense } from "react";
import BoxWrapp from "../BoxWrapp";
import { Bars2Icon } from "@heroicons/react/20/solid";

function SearchBarFallback() {
  return <>loading...</>;
}

// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div>
        <Suspense fallback={<SearchBarFallback />}>
          <div>Search</div>
        </Suspense>
        <div>Slug: {params?.slug}</div>/
        <div className="grid grid-cols-2 gap-2">
          <BoxWrapp
            icon={<Bars2Icon className="h-6 w-6 text-black" />}
            title="Decrição"
          >
            <p>
              Empresa especializada em criação de marketing digital, e-comercer,
              e-learning, chatBots, Inteligência artificial e suas vertentes,
              além de ser empresa líder do mercado de tecnologias, contamos com
              mais de 500 apoiadores e empresas parceiras para a consolidação de
              nosso objetivos.
            </p>
          </BoxWrapp>
        </div>
      </div>
    </>
  );
}

// import { GetStaticPaths, GetStaticProps } from "next";
// import { useRouter } from "next/router";
// import { Suspense } from "react";
// // import admin from "firebase-admin";

// // if (!admin.apps.length) {
// //   admin.initializeApp({
// //     credential: admin.credential.applicationDefault(),
// //     databaseURL: "https://tem-em-brasilia-default-rtdb.firebaseio.com",
// //   });
// // }

// // const firestore = admin.firestore();

// function SearchBarFallback() {
//   return <>loading...</>;
// }

// export const generateStaticParams = async () => {
//   const employersRef = firestore.collection("employers");
//   const employersSnap = await employersRef.get();
//   const params = employersSnap.docs.map((doc) => ({
//     params: { slug: doc.id },
//   }));

//   return params;
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const employerRef = firestore
//     .collection("employers")
//     .doc(params?.slug as string);
//   const employerSnap = await employerRef.get();
//   const employer = employerSnap.data();

//   return { props: { employer } };
// };

// type PageProps = {
//   employer?: {
//     name: string;
//     category: string;
//   };
// };

// export default function Page({ employer }: PageProps) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <SearchBarFallback />;
//   }

//   return (
//     <>
//       <div>
//         <Suspense fallback={<SearchBarFallback />}>
//           <div>Search</div>
//         </Suspense>
//         <div>Name: {employer?.name}</div>
//         <div>Category: {employer?.category}</div>
//       </div>
//     </>
//   );
// }

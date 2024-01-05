"use client";
import { useFirestore } from "reactfire";
import { AlertContext } from "@/app/lib/context/alertContexct";
import { collection } from "firebase/firestore";
import { useContext, useState } from "react";
import search from "$/img/search.svg";
import Image from "next/image";
import firebase from "firebase/compat/app";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import bg_brasilia from "$/img/bg-brasilia.png";
function Search() {
  const [search, setSearch] = useState<string>("");
  // const alert = useContext(AlertContext);
  // const firestore = useFirestore();

  async function SearchFirebase() {
    const data = { search: search };
    if (data.search !== "") {
      // const dbRef = collection(firestore, "employers");
      // console.log(dbRef);
      // var query = firebase.database.ref("employer")
      // console.log(query)
      // const snapshot = await query
      //   .where("name", "==", search)
      //   .get()
      //   .then((e) => console.log(e));
      // setTimeout(() => alert?.setMessage(""), 10000);
    }
  }

  return (
    <section
      className=" w-full h-[836px] bg-norepeat animation-bg"
      style={{ backgroundImage: `url(${bg_brasilia.src})` }}
    >
      <div className="max-w-[728px] w-full mx-auto h-full flex justify-center items-center">
        <div className="relative w-full h-[48px]">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="p-2.5 ms-2 text-sm font-medium text-[#339B5B] bg-white rounded-l rounded-bl border-[#339B5B] border-2 focus:outline-none w-full placeholder:text-[#339B5B] h-[48px]"
            placeholder="Search branch name..."
            required
          />
        </div>
        <button
          onClick={SearchFirebase}
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-[#339B5B]  rounded-r rounded-br rounded-bl-none border border-[#339B5B] hover:bg-[#339B5B] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#339B5B] dark:hover:bg-[#339B5B] dark:focus:bg-[#339B5B] h-[48px]"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-white  " />
        </button>
      </div>
    </section>
  );
}

export { Search };

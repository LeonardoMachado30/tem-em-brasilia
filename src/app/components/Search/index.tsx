"use client";
import { useFirestore } from "reactfire";
import { AlertContext } from "@/app/lib/context/alertContexct";
import { collection } from "firebase/firestore";
import { useContext, useState } from "react";
import search from "$/img/search.svg";
import Image from "next/image";
import firebase from "firebase/compat/app";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

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
    <div className="flex items-center w-full max-w-[300px] mx-auto">

      <div className="relative w-full">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search branch name..."
          required
        />
      </div>
      <button
        onClick={SearchFirebase}
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-white  " />
      </button>
    </div>
  );
}

export { Search };

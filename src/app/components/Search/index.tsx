"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { SearchContext } from "@/app/lib/context/searchContext";
import { blob } from "stream/consumers";
import convertData64 from "@/app/util/ConvertBase64";

function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const searchContext = useContext(SearchContext);
  // const alert = useContext(AlertContext);
  // const firestore = useFirestore();

  async function SearchFirebase(e: FormEvent) {
    e.preventDefault();
    const data = { search: search };
    if (data.search !== "") {
      searchContext?.setSearch(search);
    }
  }

  useEffect(() => {
    const bgImage = localStorage.getItem("background");

    if (bgImage) {
      setBackground(bgImage);
    } else {
      convertData64("/img/bg-brasilia-min.jpg").then((dataUrl) => {
        localStorage.setItem("background", JSON.stringify(dataUrl));
        setBackground(JSON.stringify(dataUrl));
      });
    }
  }, []);

  return (
    <form
      className="w-full h-[400px] bg-norepeat animation-bg bg-[1200px]"
      style={{ backgroundImage: `url(${background})` }}
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
          <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </form>
  );
}

export { SearchBar };

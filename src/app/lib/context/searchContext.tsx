"use client";
import { IChildren } from "@/model/EmployerModel";
import { createContext, useState } from "react";

type IContextSearch = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
} | null;

const SearchContext = createContext<IContextSearch>(null);

const SearchProvider = ({ children }: IChildren) => {
  const [search, setSearch] = useState<string>("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };

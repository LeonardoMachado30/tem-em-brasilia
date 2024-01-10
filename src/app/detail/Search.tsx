"use client"
import { useSearchParams } from "next/navigation";

export default function Search() {
  const params = useSearchParams();
  console.log(params);
  return <div>search</div>;
}

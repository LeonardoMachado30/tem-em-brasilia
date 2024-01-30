import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loading(props: any) {
  return (
    <div className="w-full h-full fixed mx-auto flex justify-center items-center">
      <ClipLoader color="#000" size={30} />
    </div>
  );
}

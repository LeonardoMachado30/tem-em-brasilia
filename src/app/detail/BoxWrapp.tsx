import { IChildren } from "@/model/EmployerModel";
import { ReactNode } from "react";

type typeWrap = string | ReactNode;

type IBoxWrap = {
  title: string;
  children: typeWrap;
  icon: typeWrap;
};

export default function BoxWrapp({ title, children, icon }: IBoxWrap) {
  return (
    <section className="w-full rounded-sm shadow bg-white h-auto flex flex-col p-5 gap-5">
      <div className="flex items-center font-black text-lg gap-2">
        {icon}
        {title}
      </div>
      <div>{children}</div>
    </section>
  );
}

import { ReactNode } from "react";

type typeWrap = string | ReactNode;

type IDetailCardWrap = {
  title: string;
  children: typeWrap;
  icon: typeWrap;
};

export default function DetailCardWrap({ title, children, icon }: IDetailCardWrap) {
  return (
    <section className="w-full rounded-sm shadow bg-white h-auto flex flex-col p-5 gap-5">
      <div className="flex items-center font-black text-lg gap-2">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
}

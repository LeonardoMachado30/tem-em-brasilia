import React, {ReactNode} from "react";

type IContainerRow = {
    children: ReactNode;
    title: string;
    classNameChildren?: string;
};

export function ContainerInput({children, title, classNameChildren}: IContainerRow) {
    const className = classNameChildren || "flex flex-col";
    return (
        <div className="flex flex-col w-full gap-2 mt-2">
            <span className="text-[#006728] font-bold">{title}</span>
            <div className={`${className} gap-4`}>{children}</div>
        </div>
    );
}
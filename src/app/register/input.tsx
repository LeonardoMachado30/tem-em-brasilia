"use client";

import {ChangeEvent, useEffect, useId, useState} from "react";
import {
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    PhotoIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import {InputProps, SelectProps, TextAreaProps} from "@/model/EmployerModel";
import InputMask from "react-input-mask";
import {ImageRender} from "@/components/inputs/ImageRender";

const classNameCustom =
    "border-[#75AE8B] border-2 text-[#006728] rounded bg-white placeholder:text-[#75AE8B] placeholder:text-sm h-[40px] w-full focus:border-[#006728] focus:outline-none focus:border-2 focus:transition focus:duration-700";

function Input(
    {
        required,
        register,
        label,
        placeholder,
        value,
        pattern,
        ...inputProps
    }: InputProps) {
    return inputProps?.mask ?
        <InputMask
            mask={inputProps.mask}
            type={inputProps.type}
            className={`${classNameCustom} ${inputProps.className} px-4`}
            {...register(label, {required})}
            placeholder={placeholder}
            value={value}
            disabled={inputProps.disabled}
            onBlur={inputProps.onBlur}/>
        :
        <input
            type={inputProps.type}
            className={`${classNameCustom} ${inputProps.className} px-4`}
            {...register(label, {required, pattern})}
            placeholder={placeholder}
            value={value}
            disabled={inputProps.disabled}
            onBlur={inputProps.onBlur}
        />;
}

function Textarea(
    {
        className,
        value,
        register,
        label,
        required,
        ...inputProps
    }: TextAreaProps) {
    return (
        <textarea
            {...register(label, {required, ...inputProps})}
            className={`px-4 pt-2 ${classNameCustom} ${className} `}
            disabled={inputProps.disabled}
            {...inputProps}
        >
      {value}
    </textarea>
    );
}

function Select({className, options, register, label}: SelectProps) {
    const [select, setSelect] = useState<boolean>(false);

    const click = () => {
        setSelect(!select);
    };

    return (
        <div className={`relative w-full ${className}`}>
            {select ? (
                <BarsArrowUpIcon className="h-6 w-6 text-[#75AE8B] absolute right-2 top-2 z-10"/>
            ) : (
                <BarsArrowDownIcon className="h-6 w-6 text-[#75AE8B] absolute right-2 top-2 z-10"/>
            )}

            <select
                defaultValue={"DEFAULT"}
                className={`relative px-4 ${classNameCustom}`}
                onClick={click}
                {...register(label)}
            >
                <option value="DEFAULT" disabled>
                    Selecione um serviço
                </option>
                {options.map((value: string) => {
                    return (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}


export {Input, Select, Textarea};

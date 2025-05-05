import React, {HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes} from "react";
import {Path, UseFormRegister, ValidationRule} from "react-hook-form";
import {IAdress} from "@/util/GetAdress";

export type Employer = {
    id?: string;
    name: string;
    email: string;
    adress: string;
    social: Array<string>;
    services: Array<Services>;
    outherServices: Array<Services>;
};

export enum Services {
    "Atendimento ao cliente",
    "Social Media",
    "Banners",
    "Landing-page",
    "E-learning",
    "E-comerce",
    "Websites",
}

export type IChildren = {
    children: ReactNode;
};

export type IFileProps = { Image: File[]; Preview: Blob };
export type IFile = Array<IFileProps>;

export interface IRegisterForm extends IAdress {
    fullName: string;
    phone: number;
    cel: number;
    description: string;
    email: string;
    idField: string;
    category: string;
    adress: string;
    adressComplement: string;
    social: Array<string>;
    services: Array<Services>;
    imageProfile: Array<File>;
    imageBackground: Array<File>;
    galery: Array<File>;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'> {
    label: Path<IRegisterForm>;
    register: UseFormRegister<IRegisterForm>;
    mask?: string;
    pattern?: ValidationRule<RegExp>; // pattern do RHF
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void | Promise<void>;
}

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
    label: Path<IRegisterForm>;
    register: UseFormRegister<IRegisterForm>;
}

export interface SelectProps extends InputProps {
    options: Array<string>;
}

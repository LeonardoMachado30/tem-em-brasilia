import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Path, UseFormRegister } from "react-hook-form";

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

export interface IFormValues {
  fullName: string;
  phone: number;
  cel: number;
  description: string;
  email: string;
  idField: string;
  category: string;
  adress: string;
  adressComplement: string;
  zip: string;
  social: Array<string>;
  services: Array<Services>;
  imageProfile: Array<File>;
  imageBackground: Array<File>;
  galery: Array<File>;
}

export type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  className?: string;
  value?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean
};

export interface TextAreaProps extends InputProps {
  maxLength?: number;
  rows?: number;
  minLength?: number;
  cols?: number;
}

export interface SelectProps extends InputProps {
  options: Array<string>;
}

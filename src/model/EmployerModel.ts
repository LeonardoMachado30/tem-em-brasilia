import { ReactNode } from "react";

type Employer = {
  id?: string;
  name: string;
  email: string;
  adress: string;
};
export type { Employer }

type IChildren = {
  children: ReactNode;
}

export type { IChildren }
import { ReactNode } from "react";

type Employer = {
  id?: string;
  name: string;
  email: string;
  adress: string;
  social: Array<string>
  services: Array<Services>,
  outherServices: Array<Services>
};

type Photos = {
  profile: string;
}

enum Services {
  "Atendimento ao cliente",
  "Social Media",
  "Banners",
  "Landing-page",
  "E-learning",
  "E-comerce",
  "Websites",
}

type Social = {
  link: string,
}


type IChildren = {
  children: ReactNode;
}

export type { IChildren, Employer }
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tem em Brasilia | Catalogo de empresas no Distrito Federal",
  description: "Catalogo de empresas no distrito federal",
  authors: [
    {
      name: "DVX soluções tecnlogicas team",
      url: "https://tem-em-brasilia.vercel.app/",
    },
  ],
  keywords:
    "Tem em Brasilia, Empresas, Expresas Distrito Federal, Brasilia, achei em brasilia",
  robots: "index, follow",
  publisher: "DVX",
  referrer: "origin",
  abstract: "Catalogo de empresas no distrito federal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

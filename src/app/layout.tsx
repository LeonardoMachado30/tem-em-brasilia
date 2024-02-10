import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import fivicons from "$/img/Group 211.png";

ReactGA.initialize("G-758T3SG2V8");
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
  icons: fivicons.src,
  // abstract: "Catalogo de empresas no distrito federal",
  // viewport: "width=device-width, initial-scale=1"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/* <FirebaseServices> */}
        <Header />
        {children}
        <Footer />
        {/* </FirebaseServices> */}
        <GoogleAnalytics gaId="G-758T3SG2V8" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

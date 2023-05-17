import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Head from "@/components/Templates/Head";

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}


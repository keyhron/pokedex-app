import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Head from "@/components/Templates/Head";
import { UserProvider } from "@/contexts/UserContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head />
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}


// src/pages/_app.tsx
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/styles/globals.css"; //Tailwind/global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
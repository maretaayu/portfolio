import type { AppProps } from "next/app";
import "./globals.css"; // Path ke globals.css
import "@fontsource-variable/sora";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

import type { AppProps } from "next/app";
import "./globals.css"; // Path ke globals.css
import "@fontsource-variable/sora";
import { AppProvider } from "../context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

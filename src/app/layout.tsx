import "@/assets/global.css";
import { Poppins } from "next/font/google";

import Script from "next/script";
import type { Metadata } from "next";
import { twJoin } from "tailwind-merge";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Restronaut.Ai",
  description: ""
};

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["400", "500", "600"]
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="//unpkg.com/react-scan/dist/auto.global.js" />
      </head>

      <body className={twJoin(poppins.variable)}>
        <Providers>
          <div className="contents">{props.children}</div>
        </Providers>
      </body>
    </html>
  );
}

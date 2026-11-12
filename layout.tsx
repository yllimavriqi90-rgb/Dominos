import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOMINOS — Community starts here",
  description: "En plats för spel, vänner och communities."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body>{children}</body></html>;
}

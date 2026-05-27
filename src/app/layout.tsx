import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-roboto-condensed",
});

export const metadata: Metadata = {
  title: "Delirio Gin | Dark Luxury",
  description: "Experience the premium taste of Delirio Gin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoCondensed.variable} dark h-full antialiased`}>
      <body 
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

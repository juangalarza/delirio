import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientShell } from "@/components/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: "--font-inter",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Delirio Destilería | Gin Premium Argentino',
    template: '%s — Delirio Destilería',
  },
  description: 'Delirio es una destilería que desafía lo convencional, creando destilados con calidad reconocida mundialmente e identidad propia.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://deliriogin.com'),
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    siteName: 'Delirio Destilería',
    locale: 'es_AR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} dark h-full antialiased`}>
      <body 
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
        <ClientShell />
      </body>
    </html>
  );
}

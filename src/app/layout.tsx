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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Delirio Destilería",
  "url": "https://deliriogin.com.ar",
  "logo": "https://delirio-one.vercel.app/images/logo.png",
  "sameAs": [
    "https://instagram.com/deliriogin",
    "https://facebook.com/deliriogin"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+54-264-456-7890",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  }
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Delirio Gin Premium",
  "brand": { "@type": "Brand", "name": "Delirio Destilería" },
  "description": "Gin artesanal argentino elaborado con botánicos de la precordillera sanjuanina.",
  "award": [
    "IWSC Double Gold 2025 — 98 puntos",
    "Global Gin Masters 2026 — Master Medal",
    "San Francisco Spirits 2025 — Double Gold"
  ]
}

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
    images: [
      {
        url: '/images/hero-delirio.jpg',
        width: 1200,
        height: 630,
        alt: 'Delirio Destilería — Gin Premium Argentino',
      },
    ],
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
        <script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          id="schema-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </body>
    </html>
  );
}

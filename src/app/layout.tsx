import type { Metadata } from "next";
import { Figtree, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://servicolinmobiliaria.com'),
  title: {
    default: 'Servicol Inmobiliaria — Venta y Arriendo en Boyacá',
    template: '%s | Servicol',
  },
  description:
    'Inmobiliaria con más de 25 años en Duitama, Paipa y Sogamoso. Compra, venta, arriendo y administración de propiedades en Boyacá.',
  openGraph: {
    siteName: 'Servicol Inmobiliaria',
    locale: 'es_CO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${figtree.variable} ${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "LocalBusiness", "RealEstateAgent"],
                  "@id": "https://servicolinmobiliaria.com/#organization",
                  name: "Servicol Inmobiliaria",
                  legalName: "Servicol Ltda.",
                  url: "https://servicolinmobiliaria.com",
                  foundingDate: "1999",
                  description:
                    "Inmobiliaria con más de 25 años de experiencia en Duitama, Boyacá. Compraventa, arriendo y administración de propiedades en el corredor Duitama–Sogamoso–Paipa.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Cr. 15 #14-69 Of. 405",
                    addressLocality: "Duitama",
                    addressRegion: "Boyacá",
                    addressCountry: "CO",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 5.8266,
                    longitude: -73.0257,
                  },
                  areaServed: [
                    { "@type": "City", name: "Duitama" },
                    { "@type": "City", name: "Sogamoso" },
                    { "@type": "City", name: "Paipa" },
                    { "@type": "City", name: "Santa Rosa de Viterbo" },
                    { "@type": "City", name: "Tibasosa" },
                  ],
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "08:00",
                      closes: "18:00",
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: "Saturday",
                      opens: "09:00",
                      closes: "13:00",
                    },
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: "Spanish",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

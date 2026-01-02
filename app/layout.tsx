import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silencie",
  description: "Programa de meditacao guiada de 21 dias com Mari Campos. Aprenda a acalmar a mente, sair da ansiedade e criar clareza emocional no dia a dia.",
  keywords: [
    "meditacao",
    "meditacao guiada",
    "programa de meditacao",
    "21 dias de meditacao",
    "Mari Campos",
    "mindfulness",
    "ansiedade",
    "clareza mental",
    "yoga",
    "autoconhecimento",
    "presenca",
    "silencio interior",
  ],
  authors: [{ name: "Mari Campos" }],
  creator: "Mari Campos",
  publisher: "Silencie",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Silencie",
    title: "Silencie - Programa de Meditacao Guiada de 21 dias",
    description: "Aprenda a acalmar a mente, sair da ansiedade e criar clareza emocional no dia a dia com o programa de meditacao guiada de Mari Campos.",
    images: [
      {
        url: "/photos/mari.webp",
        width: 1200,
        height: 630,
        alt: "Silencie - Programa de Meditacao com Mari Campos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Silencie - Programa de Meditacao Guiada de 21 dias",
    description: "Aprenda a acalmar a mente, sair da ansiedade e criar clareza emocional no dia a dia com Mari Campos.",
    images: ["/photos/mari.webp"],
  },
  alternates: {
    canonical: "https://silencie.com.br",
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#657E66" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="canonical" href="https://silencie.com.br" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

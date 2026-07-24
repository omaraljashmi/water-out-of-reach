import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Water Out of Reach",
    template: "%s · Water Out of Reach",
  },
  description:
    "A source backed map of countries where at least one in five people lack a basic drinking water service, with a country specific giving route.",
  openGraph: {
    title: "Water Out of Reach",
    description:
      "37 countries where at least one in five people lack basic drinking water access.",
    type: "website",
    images: [
      {
        url: "/og-water-access.png",
        width: 1200,
        height: 630,
        alt: "Water Out of Reach, an editorial map of basic drinking water access",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Out of Reach",
    description:
      "37 countries where at least one in five people lack basic drinking water access.",
    images: ["/og-water-access.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

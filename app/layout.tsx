import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Where Water Runs Thin",
    template: "%s · Where Water Runs Thin",
  },
  description:
    "A source backed map of countries where at least one in five people lack a basic drinking water service, with a verified route to fund clean water projects.",
  openGraph: {
    title: "Where Water Runs Thin",
    description:
      "37 countries where at least one in five people lack basic drinking water access.",
    type: "website",
    images: [
      {
        url: "/og-water-access.png",
        width: 1200,
        height: 630,
        alt: "Where Water Runs Thin, an editorial map of basic drinking water access",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Water Runs Thin",
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

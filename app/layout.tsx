import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Where Water Runs Thin",
    template: "%s · Where Water Runs Thin",
  },
  description:
    "A source backed map of countries facing extremely high baseline water stress, with a verified route to support safe water work.",
  openGraph: {
    title: "Where Water Runs Thin",
    description: "25 countries. Extremely high water stress.",
    type: "website",
    images: [
      {
        url: "/og-water-stress.png",
        width: 1200,
        height: 630,
        alt: "Where Water Runs Thin, an editorial map of extremely high water stress",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Water Runs Thin",
    description: "25 countries. Extremely high water stress.",
    images: ["/og-water-stress.png"],
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

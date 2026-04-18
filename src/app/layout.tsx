import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamkeene",
  description: "Tamkeene — early-stage educational product",
  icons: {
    icon: "/assets/icons/app_icon.svg",
    shortcut: "/assets/icons/app_icon.svg",
    apple: "/assets/icons/app_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
      <body className="min-h-dvh font-sans antialiased">
        {children}
        {gaMeasurementId ? (
          <GoogleAnalytics gaId={gaMeasurementId} />
        ) : null}
      </body>
    </html>
  );
}

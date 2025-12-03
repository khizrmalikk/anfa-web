import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { AudioWidget } from "@/components/audio-widget";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bannerMessages = [
  "Worldwide shipping",
  "Maison of modern desert luxury",
];

export const metadata: Metadata = {
  title: "Anfa",
  description:
    "Anfa crafts elevated resort and ready-to-wear pieces for the modern woman. Discover the new desert-luxe wardrobe anchored in warm neutrals and architectural tailoring.",
  metadataBase: new URL("https://anfalabel.com"),
  applicationName: "Anfa Label",
  keywords: [
    "Anfa",
    "luxury fashion",
    "resort wear",
    "Shopify storefront",
    "desert chic",
  ],
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <div className="sticky top-0 z-50 overflow-hidden border-b border-[var(--border)] bg-[var(--primary)] text-[#fef3df]">
            <div className="scroll-banner whitespace-nowrap py-2 text-[11px] uppercase tracking-[0.4em]">
              {Array.from({ length: 3 }).map((_, loopIdx) =>
                bannerMessages.map((message, idx) => (
                  <span key={`banner-${loopIdx}-${idx}`} className="mx-6">
                    {message}
                  </span>
                )),
              )}
            </div>
          </div>
          <SiteHeader />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <AudioWidget />
        </div>
      </body>
    </html>
  );
}

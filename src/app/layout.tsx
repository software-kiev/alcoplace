import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import { ShoppingListProvider } from "@/lib/shopping-list-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alcoplace — знайди напій за найкращою ціною",
  description: "Маркетплейс-агрегатор алкогольних напоїв. Порівнюй ціни, знаходь магазини поруч.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ShoppingListProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ShoppingListProvider>
      </body>
    </html>
  );
}

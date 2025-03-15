import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const scp = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genius AI - Smart Assistant",
  description: "Your personal AI assistant powered by Google Gemini",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

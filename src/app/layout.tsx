"use client";

import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/authcontext";

const inter = Inter({ subsets: ["latin"] });
const scp = Source_Code_Pro({ subsets: ["latin"] });

// Metadata needs to be in a separate file or use a different approach since this is now a client component
const metadata = {
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
            <Toaster position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter, Source_Code_Pro } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";
// import { ThemeProvider } from "next-themes";

// const inter = Inter({ subsets: ["latin"] });
// const scp = Source_Code_Pro({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Genius AI - Smart Assistant",
//   description: "Your personal AI assistant powered by Google Gemini",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
//           {children}
//           <Toaster position="top-center" />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

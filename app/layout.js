import { getServerSession } from "next-auth";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/SessionProvider";
import ThemeToggle from "@/components/ui/themeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
});

export const metadata = {
  title: "SecZap",
  description: "Virtual Virus detector...",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider session={session}>
            {children}
            <Toaster richColors closeButton />
            <ThemeToggle />
          </AuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

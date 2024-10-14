import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "@/context/SessionProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider session={session}>
            {children}
            <Toaster richColors />
            <ThemeToggle />
          </AuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

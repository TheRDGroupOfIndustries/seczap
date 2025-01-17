import Head from "next/head";
import { Roboto } from "next/font/google";
import { getServerSession } from "next-auth";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/SessionProvider";
// import ThemeToggle from "@/components/ui/themeToggle";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const viewport = {
  themeColor: "dark",
};
export const metadata = {
  title: "SecZap | Advanced Cybersecurity Solutions",
  description:
    "SecZap offers comprehensive cybersecurity and web intelligence solutions, including vulnerability assessments, OSINT investigations, and cyber forensics. Protect your digital assets with us.",
  icons: { icon: "/favicon.ico" },
  // SEO
  keywords:
    "SecZap, Cybersecurity, OSINT, Digital Forensics, Vulnerability Assessments, Threat Intelligence, Cyber Threat Management, Dark Web Monitoring, Secure Digital Assets, Cybersecurity Services",
  author: "SecZap Team",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    title: "SecZap | Advanced Cybersecurity Solutions",
    description:
      "SecZap delivers tailored cybersecurity solutions, including real-time threat intelligence, cyber forensics, and advanced OSINT. Safeguard your business today.",
    url: "https://seczap.com",
  },
};

const Meta = () => (
  <Head>
    <title>SecZap | Advanced Cybersecurity Solutions</title>
    <meta
      name="keywords"
      content="
          SecZap, Cybersecurity, OSINT, Digital Forensics, Vulnerability Assessments, 
          Threat Intelligence, Cyber Threat Management, Dark Web Monitoring, 
          Secure Digital Assets, Cybersecurity Services, Protect Digital World, 
          Cyber Forensics Experts, Website Security Solutions, Proactive Threat Management
        "
    />
    <meta
      name="description"
      content="SecZap offers tailored cybersecurity services, including real-time threat intelligence, OSINT investigations, and expert cyber forensics. Protect your digital world with precision and expertise."
    />
    <meta name="author" content="SecZap Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <link rel="canonical" href="https://seczap.vercel.app" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content="SecZap | Advanced Cybersecurity Solutions"
    />
    <meta
      property="og:description"
      content="Discover tailored cybersecurity solutions with SecZap. From OSINT investigations to vulnerability assessments, protect your business from emerging threats."
    />
    <meta property="og:url" content="https://seczap.vercel.app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <Meta />
      <body className={`${roboto.className} antialiased`}>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider session={session}>
            {children}
            <Toaster richColors closeButton />
            {/* <ThemeToggle /> */}
          </AuthProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

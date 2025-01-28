import { navbarLinksQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default async function RootLayout({ children }) {
  const navData = await sanityFetch({ query: navbarLinksQuery });

  return (
    <>
      <Navbar navData={navData} />
      {children}
      <Footer navData={navData} />
    </>
  );
}

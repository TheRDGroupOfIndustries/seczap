import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutUsQuery,
  faqsQuery,
  heroQuery,
  readyToSecureQuery,
} from "@/sanity/lib/queries";

import Loader from "../ui/loader";
import Hero from "./sections/Hero";
import AboutUs from "./sections/AboutUs";
import ContactUs from "./sections/ContactUs";
import OurServices from "./sections/OurServices";
import WhyChooseUs from "./sections/WhyChooseUs";
import ProblemsAndSolutions from "./sections/ProblemsAndSolutions";
import HowWeDeliverValue from "./sections/HowWeDeliverValue";
import GrowingNeed from "./sections/GrowingNeed";
import ReadyToSecure from "./sections/ReadyToSecure";
import FAQs from "./sections/FAQs";

const Home = async () => {
  const heroData = await sanityFetch({ query: heroQuery });
  const aboutUsData = await sanityFetch({ query: aboutUsQuery });
  const readyToSecureData = await sanityFetch({ query: readyToSecureQuery });
  const faqsData = await sanityFetch({ query: faqsQuery });
  if (!heroData) return <Loader />;

  return (
    <main className="w-full h-full overflow-hidden">
      <Hero heroData={heroData} />
      {aboutUsData && <AboutUs aboutUsData={aboutUsData} />}
      <OurServices />
      <WhyChooseUs />
      <ProblemsAndSolutions />
      <HowWeDeliverValue />
      <GrowingNeed />
      {readyToSecureData && (
        <ReadyToSecure readyToSecureData={readyToSecureData} />
      )}
      {faqsData && <FAQs faqsData={faqsData} />}
      <ContactUs />
    </main>
  );
};

export default Home;

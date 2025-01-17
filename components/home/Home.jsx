import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutUsQuery,
  contactUsInfoQuery,
  faqsQuery,
  growingNeedQuery,
  heroQuery,
  howWeDeliverValueQuery,
  ourServicesQuery,
  problemsAndSolutionsQuery,
  readyToSecureQuery,
  whyChooseUsQuery,
} from "@/sanity/lib/queries";
import PropTypes from "prop-types";
import { Suspense, ErrorBoundary } from "react";

import Loader from "../ui/loader";
import Hero from "./sections/Hero";
import AboutUs from "./sections/AboutUs";
import ContactUs from "./sections/ContactUs";
import OurServices from "./sections/OurServices";
import WhyChooseUs from "./sections/WhyChooseUs";
import ProblemsAndSolutions from "./sections/ProblemsAndSolutions";
// import HowWeDeliverValue from "./sections/HowWeDeliverValue";
import GrowingNeed from "./sections/GrowingNeed";
import ReadyToSecure from "./sections/ReadyToSecure";
import FAQs from "./sections/FAQs";

const fetchSectionData = async (query, section) => {
  try {
    return await sanityFetch({ query });
  } catch (error) {
    console.error(`Error fetching ${section} data:`, error);
    return null;
  }
};

const SectionWrapper = ({ children, loading = <Loader /> }) => (
  <Suspense fallback={loading}>
    {/* <ErrorBoundary fallback={<div>Something went wrong</div>}> */}
    {children}
    {/* </ErrorBoundary> */}
  </Suspense>
);

const Home = async () => {
  const [
    heroData,
    aboutUsData,
    ourServicesData,
    whyChooseUsData,
    problemsAndSolutionsData,
    // howWeDeliverValueData,
    growingNeedData,
    readyToSecureData,
    faqsData,
    contactUsInfoData,
  ] = await Promise.all([
    fetchSectionData(heroQuery, "hero"),
    fetchSectionData(aboutUsQuery, "aboutUs"),
    fetchSectionData(ourServicesQuery, "ourServices"),
    fetchSectionData(whyChooseUsQuery, "whyChooseUs"),
    fetchSectionData(problemsAndSolutionsQuery, "problemsAndSolutions"),
    // fetchSectionData(howWeDeliverValueQuery, "howWeDeliverValue"),
    fetchSectionData(growingNeedQuery, "growingNeed"),
    fetchSectionData(readyToSecureQuery, "readyToSecure"),
    fetchSectionData(faqsQuery, "faqs"),
    fetchSectionData(contactUsInfoQuery, "contactUsInfo"),
  ]);

  if (!heroData) return <Loader />;

  return (
    <main className="w-full h-full overflow-hidden">
      <SectionWrapper>
        <Hero heroData={heroData} />
      </SectionWrapper>

      {aboutUsData && (
        <SectionWrapper>
          <AboutUs aboutUsData={aboutUsData} />
        </SectionWrapper>
      )}

      <SectionWrapper>
        <OurServices ourServicesData={ourServicesData} />
      </SectionWrapper>

      <SectionWrapper>
        <WhyChooseUs whyChooseUsData={whyChooseUsData} />
      </SectionWrapper>

      <SectionWrapper>
        <ProblemsAndSolutions
          problemsAndSolutionsData={problemsAndSolutionsData}
        />
      </SectionWrapper>

      {/* <SectionWrapper>
        <HowWeDeliverValue howWeDeliverValueData={howWeDeliverValueData} />
      </SectionWrapper> */}

      <SectionWrapper>
        <GrowingNeed growingNeedData={growingNeedData} />
      </SectionWrapper>

      {readyToSecureData && (
        <SectionWrapper>
          <ReadyToSecure readyToSecureData={readyToSecureData} />
        </SectionWrapper>
      )}

      {faqsData && (
        <SectionWrapper>
          <FAQs faqsData={faqsData} />
        </SectionWrapper>
      )}

      <SectionWrapper>
        <ContactUs contactUsInfoData={contactUsInfoData} />
      </SectionWrapper>
    </main>
  );
};

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.node,
};

export default Home;

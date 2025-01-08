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

const Home = () => {
  return (
    <main className="w-full h-full overflow-hidden">
      <Hero />
      <AboutUs />
      <OurServices />
      <WhyChooseUs />
      <ProblemsAndSolutions />
      <HowWeDeliverValue />
      <GrowingNeed />
      <ReadyToSecure />
      <FAQs />
      <ContactUs />
    </main>
  );
};

export default Home;

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section
      id="hero"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-94px)] xl:h-[calc(100vh-94px)] select-none p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden"
    >
      <div className="w-full h-full flex-center flex-col-reverse md:flex-row gap-2 md:gap-4 lg:gap-6 overflow-hidden">
        <div className="flex-1 w-full h-fit grid items-center space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-balance">
            Securing Tomorrow's Digital Frontier
          </h1>
          <p className="text-sm lg:text-md xl:text-lg text-sky-600 text-balanc text-justif">
            Delhi's premier cybersecurity solutions provider, protecting your
            digital assets with next-generation security intelligence.
          </p>
          <div className="flex gap-2 md:gap-4">
            <Button
              onClick={() => router.push("/#problems-and-solutions")}
              size="lg"
              effect="shine"
              className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
            >
              Explore Solutions
            </Button>
            <Button
              onClick={() => router.push("/#contact-us")}
              size="lg"
              variant="outline"
              effect="gooeyRight"
              className="bg-transparent border-sky-700 text-sky-600 text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
            >
              Contact Us
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full h-full shadow-md overflow-hidden">
          <Image
            src="/assets/hero-banner.jpg"
            alt="hero-banner"
            width={800}
            height={800}
            className="w-full h-full overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

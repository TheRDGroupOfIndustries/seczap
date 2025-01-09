"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = ({ heroData }) => {
  const router = useRouter();

  return (
    <section
      id="hero"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-94px)] xl:h-[calc(100vh-94px)] select-none p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden"
    >
      <div className="w-full h-full flex-center flex-col-reverse md:flex-row gap-2 md:gap-4 lg:gap-6 overflow-hidden">
        <div className="flex-1 w-full h-fit grid items-center space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-balance">
            {heroData?.heading}
          </h1>
          <p className="text-sm lg:text-md xl:text-lg text-sky-600 text-balanc text-justif">
            {heroData?.description}
          </p>
          <div className="flex gap-2 md:gap-4">
            {heroData?.buttonOne && (
              <Button
                onClick={() => router.push(heroData?.buttonOne?.link)}
                size="lg"
                effect="shine"
                className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
              >
                {heroData?.buttonOne?.text}
              </Button>
            )}
            {heroData?.buttonTwo && (
              <Button
                onClick={() => router.push(heroData?.buttonTwo?.link)}
                size="lg"
                variant="outline"
                effect="gooeyRight"
                className="bg-transparent border-sky-700 text-sky-600 text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
              >
                {heroData?.buttonTwo?.text}
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 w-full h-full shadow-md overflow-hidden">
          {heroData?.heroBannerImage && (
            <Image
              src={heroData?.heroBannerImage?.imageURL}
              alt={heroData?.heroBannerImage?.alt}
              width={1000}
              height={1000}
              className="w-full h-full overflow-hidden"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

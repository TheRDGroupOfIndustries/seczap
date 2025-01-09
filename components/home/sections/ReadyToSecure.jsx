"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ReadyToSecure = ({ readyToSecureData }) => {
  const router = useRouter();
  return (
    <section
      id="ready-to-secure"
      className="w-full h-fit select-none p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 overflow-hidden"
    >
      <div className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden">
        <div className="w-full h-full flex-center flex-col gap-4 md:gap-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
            {readyToSecureData?.heading}
          </h2>
          <p className="w-fit mx-auto text-sm md:text-md lg:text-lg xl:text-xl text-balanc text-center text-blue-500">
            {readyToSecureData?.description}
          </p>
          <div className="flex gap-2 md:gap-4">
            {readyToSecureData?.buttonOne && (
              <Button
                onClick={() => router.push(readyToSecureData?.buttonOne?.link)}
                size="lg"
                effect="shine"
                className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
              >
                {readyToSecureData?.buttonOne?.text}
              </Button>
            )}
            {readyToSecureData?.buttonTwo && (
              <Button
                onClick={() => router.push(readyToSecureData?.buttonTwo?.link)}
                size="lg"
                variant="outline"
                effect="gooeyRight"
                className="bg-transparent border-sky-700 text-sky-600 text-md md:text-lg font-bold md:px-4 lg:px-6 xl:px-8"
              >
                {readyToSecureData?.buttonTwo?.text}
              </Button>
            )}
          </div>
          <p className="w-fit mx-auto text-xs md:text-sm lg:text-md xl:text-lg text-balance text-center text-sky-500">
            No commitments. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReadyToSecure;

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ReadyToSecure = () => {
  const router = useRouter();
  return (
    <section
      id="ready-to-secure"
      className="w-full h-fit select-none p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 overflow-hidden"
    >
      <div className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 xl:p-10 overflow-hidden">
        <div className="w-full h-full flex-center flex-col gap-4 md:gap-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
            Ready to Secure Your Digital Assets?
          </h2>
          <p className="w-fit mx-auto text-sm md:text-md lg:text-lg xl:text-xl text-balanc text-center text-blue-500">
            Get started with SECZAP today and experience enterprise-grade
            cybersecurity solutions tailored to your business needs.
          </p>
          <div className="flex gap-2 md:gap-4">
            <Button
              onClick={() => router.push("/#problems-and-solutions")}
              size="sm"
              effect="shine"
              className="bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8"
            >
              Schedule a Demo
            </Button>
            <Button
              onClick={() => router.push("/#contact-us")}
              size="sm"
              variant="outline"
              effect="gooeyRight"
              className="bg-transparent border-sky-700 text-sky-600 text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8"
            >
              Talk to an Expert
            </Button>
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

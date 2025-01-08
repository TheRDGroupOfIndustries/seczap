"use client";

import Image from "next/image";
import { SiTicktick } from "react-icons/si";

const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-94px)] select-none bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <div className="flex-center">
        <h2 className="font-bold text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Who We Are
        </h2>
      </div>
      <div className="w-full h-fit flex-center flex-col-reverse md:flex-row gap-2 md:gap-4 lg:gap-6 overflow-hidden">
        <div className="flex-1 w-full h-fit grid items-center space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
          <h3 className="font-bold text-white text-lg md:text-xl lg:text-2xl xl:text-3xl text-balanc">
            Delhi's Leading Cybersecurity Experts
          </h3>
          <p className="w-full h-fit text-sm lg:text-md xl:text-lg text-sky-600 text-balanc text-justif">
            At <b>SECZAP</b>, we are a team of dedicated cybersecurity
            professionals committed to protecting businesses in the digital age.
            With over a decade of experience in threat detection, incident
            response, and security consulting, we provide comprehensive
            solutions that safeguard your digital assests.
          </p>
          <div className="w-full h-fit space-y-2 md:space-y-4 lg:space-y-6">
            <div className="w-fit h-fit flex-center gap-2">
              <SiTicktick className="fill-sky-600 text-sky-600" />

              {/* <div className="w-4 h-4 font-bold flex-center bg-sky-600 rounded-full">
                <MdDone color="black" />
              </div> */}
              <p className="text-xs lg:text-sm xl:text-md text-sky-600 text-balance">
                Expert team with 10+years of industry experience
              </p>
            </div>
            <div className="w-fit h-fit flex-center gap-2">
              <SiTicktick className="fill-sky-600 text-sky-600" />
              <p className="text-xs lg:text-sm xl:text-md text-sky-600 text-balance">
                State-of-the-art security operations center
              </p>
            </div>
            <div className="w-fit h-fit flex-center gap-2">
              <SiTicktick className="fill-sky-600 text-sky-600" />
              <p className="text-xs lg:text-sm xl:text-md text-sky-600 text-balance">
                Certified security professionals
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-full lg:h-[50vh] shadow-md rounded-lg overflow-hidden">
          <Image
            src="https://www.cambridgehealth.edu/wp-content/uploads/2024/04/it-1.webp"
            alt="about-banner"
            width={800}
            height={800}
            objectFit="cover"
            className="w-full h-full object-cover overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

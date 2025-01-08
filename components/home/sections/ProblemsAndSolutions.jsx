"use client";

import { FaShieldHalved, FaUserSecret, FaUsersGear } from "react-icons/fa6";
import { IoWarningSharp } from "react-icons/io5";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { FaUserNinja, FaLock } from "react-icons/fa";

const ProblemsAndSolutions = () => {
  return (
    <section
      id="problems-and-solutions"
      className="w-full min-h-fit lg:h-fit lg:max-h-[calc(100vh-94px)] select-none bg-primary-clr/70 dark:bg-primary-clr/70 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <div className="flex-center">
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Problems & Solutions
        </h2>
      </div>

      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <div className="w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="space-y-2 lg:space-y-4">
            <div className="w-full h-fit flex items-center gap-4">
              <IoWarningSharp size={20} className="fill-blue-500" />
              <h4 className="text-blue-500 text-sm md:text-md lg:text-lg">
                Common Security Challenges
              </h4>
            </div>

            <div className="w-full h-fit flex gap-4">
              <FaShieldHalved size={20} className="fill-blue-500" />
              <div className="space-y-2">
                <h4 className="text-white text-sm md:text-md lg:text-lg font-semibold">
                  Data Breaches
                </h4>
                <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                  Comprehensive security assessments to identify and eliminate
                  potential threats.
                </p>
              </div>
            </div>

            <div className="w-full h-fit flex gap-4">
              <MdOutlineSettingsSuggest size={20} className="fill-blue-500" />
              <div className="space-y-2">
                <h4 className="text-white text-sm md:text-md lg:text-lg font-semibold">
                  Ransomware Attacks
                </h4>
                <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                  Comprehensive security assessments to identify and eliminate
                  potential threats.
                </p>
              </div>
            </div>

            <div className="w-full h-fit flex gap-4">
              <FaUserNinja size={20} className="fill-blue-500" />
              <div className="space-y-2">
                <h4 className="text-white text-sm md:text-md lg:text-lg font-semibold">
                  Social Engineering
                </h4>
                <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                  Comprehensive security assessments to identify and eliminate
                  potential threats.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="space-y-2 lg:space-y-4">
            <div className="w-full h-fit flex items-center gap-4">
              <FaShieldHalved size={20} className="fill-blue-500" />
              <h4 className="text-blue-500 text-sm md:text-md lg:text-lg">
                Over Solutions
              </h4>
            </div>

            <div className="w-full h-fit flex gap-4">
              <FaLock size={20} className="fill-blue-500 font-semibold" />
              <div className="space-y-2">
                <h4 className="text-white text-sm md:text-md lg:text-lg">
                  Advance Encryption
                </h4>
                <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                  Advanced open-source intelligence gathering and analysis.
                </p>
              </div>
            </div>

            <div className="w-full h-fit flex gap-4">
              <FaUserSecret size={20} className="fill-blue-500 font-semibold" />
              <div className="space-y-2">
                <h4 className="text-white text-sm md:text-md lg:text-lg">
                  24/7 Threat Monitoring
                </h4>
                <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                  Advanced open-source intelligence gathering and analysis.
                </p>
              </div>
            </div>

            <div className="w-full h-fit flex gap-4">
              <FaUsersGear size={20} className="fill-blue-500 font-semibold" />
              <div className="space-y-2">
                <h4 className="text-white text-sm md:text-md lg:text-lg">
                  Security Training
                </h4>
                <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                  Advanced open-source intelligence gathering and analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsAndSolutions;

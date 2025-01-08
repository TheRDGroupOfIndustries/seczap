"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaShieldHalved, FaXTwitter } from "react-icons/fa6";
import { MdLocationPin, MdLocalPhone, MdMail } from "react-icons/md";

const ContactUs = () => {
  return (
    <section
      id="contact-us"
      className="w-full h-fit select-none bg-primary-clr/70 dark:bg-primary-clr/70 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <div className="flex-center">
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Contact Us
        </h2>
      </div>

      <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        {/* Contact Form */}
        <div className="w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden">
          <div className="space-y-2 lg:space-y-4">
            <h4 className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
              Get in Touch
            </h4>

            <form className="w-full h-fit space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  // placeholder="Name"
                  className="w-full h-10 text-white bg-primary-clr dark:bg-gray-900 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded px-2 py-1 overflow-hidden"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  // placeholder="Email"
                  className="w-full h-10 text-white bg-primary-clr dark:bg-gray-900 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded px-2 py-1 overflow-hidden"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  // placeholder="Message"
                  className="w-full text-white bg-primary-clr dark:bg-gray-900 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded px-2 py-1 overflow-hidden"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                effect="gooeyRight"
                className="w-full bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
        {/* contact infor */}
        <div className="w-full h-full space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 overflow-hidde">
          <div className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="space-y-2 lg:space-y-4">
              <h4 className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
                Contact Information
              </h4>

              <div className="w-full h-fit flex gap-4">
                <MdLocationPin
                  size={20}
                  className="fill-blue-500 font-semibold mt-1"
                />
                <div className="space-y-2">
                  <h4 className="text-white text-sm md:text-md lg:text-lg">
                    Address
                  </h4>
                  <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                    <Link
                      href="https://goo.gl/maps/123CyberStreet"
                      className="w-fit hover-link-underline"
                    >
                      123 Cyber Street, Delhi, India
                    </Link>
                  </p>
                </div>
              </div>
              <div className="w-full h-fit flex gap-4">
                <MdLocalPhone
                  size={20}
                  className="fill-blue-500 font-semibold mt-1"
                />
                <div className="space-y-2">
                  <h4 className="text-white text-sm md:text-md lg:text-lg">
                    Phone
                  </h4>
                  <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                    <Link
                      href="tel:+919876543210"
                      className="w-fit hover-link-underline"
                    >
                      +91 987 654 3210
                    </Link>
                  </p>
                </div>
              </div>
              <div className="w-full h-fit flex gap-4">
                <MdMail
                  size={20}
                  className="fill-blue-500 font-semibold mt-1"
                />
                <div className="space-y-2">
                  <h4 className="text-white text-sm md:text-md lg:text-lg">
                    Email
                  </h4>
                  <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                    <Link
                      href="mailto:info@seczap.com"
                      className="w-fit hover-link-underline"
                    >
                      info@seczap.com
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* social links */}
          <div className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="space-y-2 lg:space-y-4">
              <h4 className="text-white text-lg md:text-xl lg:text-2xl font-semibold">
                Follow Us
              </h4>

              <div className="group w-fit h-fit flex gap-4">
                {[
                  {
                    id: "linkedIn",
                    href: "https://www.linkedin.com",
                    icon: FaLinkedin,
                  },
                  {
                    id: "twitter",
                    href: "https://www.twitter.com",
                    icon: FaXTwitter,
                  },
                  {
                    id: "facebook",
                    href: "https://www.facebook.com",
                    icon: FaFacebook,
                  },
                  {
                    id: "instagram",
                    href: "https://www.instagram.com",
                    icon: FaInstagram,
                  },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social?.href}
                    target="_blank"
                    className="relative opacity-80 hover:opacity-100 hover:scale-125 transition-all ease-in-out duration-300"
                  >
                    <social.icon
                      size={25}
                      className="fill-sky-500 font-semibold"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

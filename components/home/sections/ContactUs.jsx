"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationPin, MdLocalPhone, MdMail } from "react-icons/md";

const ContactUs = () => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="contact-us"
      className="w-full h-fit select-none bg-primary-clr/70 dark:bg-primary-clr/70 backdrop-blur-md p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <motion.div
        variants={fadeInOut("down", "tween", 0.2, 0.5)}
        className="flex-center"
      >
        <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Contact Us
        </h2>
      </motion.div>

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        {/* Contact Form */}
        <motion.div
          variants={fadeInOut("right", "spring", 0.3, 0.5)}
          className="w-full h-full bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
        >
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            className="space-y-2 lg:space-y-4"
          >
            <motion.h4
              variants={fadeInOut("down", "tween", 0.2, 0.5)}
              className="text-white text-lg md:text-xl lg:text-2xl font-semibold"
            >
              Get in Touch
            </motion.h4>

            <motion.form
              variants={staggerContainer(0.1, 0.2)}
              className="w-full h-fit space-y-4"
            >
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
              <motion.div variants={fadeInOut("up", "spring", 0.4, 0.5)}>
                <Button
                  type="submit"
                  size="lg"
                  effect="gooeyRight"
                  className="w-full bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold rounded md:px-4 lg:px-6 xl:px-8"
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
        {/* contact infor */}
        <div className="w-full h-full space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 overflow-hidde">
          <motion.div
            variants={fadeInOut("left", "spring", 0.3, 0.5)}
            className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
          >
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="space-y-2 lg:space-y-4"
            >
              <motion.h4
                variants={fadeInOut("down", "tween", 0.2, 0.5)}
                className="text-white text-lg md:text-xl lg:text-2xl font-semibold"
              >
                Contact Information
              </motion.h4>

              {[
                {
                  icon: MdLocationPin,
                  title: "Address",
                  content: "123 Cyber Street, Delhi, India",
                  link: "https://goo.gl/maps/123CyberStreet",
                },
                {
                  icon: MdLocalPhone,
                  title: "Phone",
                  content: "+91 987 654 3210",
                  link: "tel:+919876543210",
                },
                {
                  icon: MdMail,
                  title: "Email",
                  content: "info@seczap.com",
                  link: "mailto:info@seczap.com",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInOut("up", "tween", 0.2, 0.5 + index * 0.2)}
                  className="w-full h-fit flex gap-4"
                >
                  <item.icon
                    size={20}
                    className="fill-blue-500 font-semibold mt-1"
                  />
                  <div className="space-y-2">
                    <h4 className="text-white text-sm md:text-md lg:text-lg">
                      {item.title}
                    </h4>
                    <p className="text-sky-500 text-balance text-sm md:text-md lg:text-lg">
                      <Link
                        href={item.link}
                        className="w-fit hover-link-underline"
                      >
                        {item.content}
                      </Link>
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {/* social links */}
          <motion.div
            variants={fadeInOut("left", "spring", 0.4, 0.5)}
            className="w-full h-fit bg-primary-clr/90 dark:bg-primary-clr/90 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
          >
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              className="space-y-2 lg:space-y-4"
            >
              <motion.h4
                variants={fadeInOut("down", "tween", 0.2, 0.5)}
                className="text-white text-lg md:text-xl lg:text-2xl font-semibold"
              >
                Follow Us
              </motion.h4>

              <motion.div
                variants={fadeInOut("up", "spring", 0.3, 0.5)}
                className="group w-fit h-fit flex gap-4"
              >
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactUs;

"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { fadeInOut, staggerContainer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationPin, MdLocalPhone, MdMail } from "react-icons/md";
import Header from "@/components/ui/header";

const ContactUs = ({ contactUsInfoData }) => {
  return (
    <motion.section
      variants={staggerContainer(0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="contact-us"
      className="w-full h-fit select-none bg-primary-clr dark:bg-primary-clr p-4 md:p-6 lg:p-8 xl:p-10 py-10 lg:py-14 xl:py-16 space-y-6 md:space-y-8 xl:space-y-10 overflow-hidden"
    >
      <Header text="Contact Us" />

      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {/* Contact Form */}
        <motion.div
          variants={fadeInOut("right", "spring", 0.3, 0.5)}
          className="w-full h-full bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
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

            <ContactForm />
          </motion.div>
        </motion.div>
        {/* contact infor */}
        <ContactInfo contactUsInfoData={contactUsInfoData} />
      </div>
    </motion.section>
  );
};

export default ContactUs;

const ContactForm = () => {
  const { data: session } = useSession();
  const user_id = session?.user?._id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!validateEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, message: "Message is required" }));
    } else {
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  };

  const sendContactForm = async (formData) => {
    const response = await fetch("/api/contact-us/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to send message");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // validating form fields
    if (!name) formErrors.name = "Name is required";
    if (!email) formErrors.email = "Email is required";
    else if (!validateEmail(email)) formErrors.email = "Invalid email format";
    if (!message) formErrors.message = "Message is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      try {
        await toast.promise(
          sendContactForm({ user_id, name, email, message }),
          {
            loading: "Sending message...",
            success: () => {
              setName("");
              setEmail("");
              setMessage("");
              return "Message sent successfully! We'll reach out to you very soon.";
            },
            error: "Failed to send message. Please try again later.",
          }
        );
      } catch (error) {
        console.error("Error submitting contact form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerContainer(0.1, 0.2)}
      className="w-full h-fit space-y-4"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-blue-400">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={handleNameChange}
          // placeholder="Name"
          className="w-full h-10 text-white bg-primary-clr dark:bg-gray-900 backdrop-blur-md border border-blue-950/50 ring-1 ring-blue-900/50 rounded px-2 py-1 overflow-hidden"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-blue-400">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={handleEmailChange}
          // placeholder="Email"
          className="w-full h-10 text-white bg-primary-clr dark:bg-gray-900 backdrop-blur-md border border-blue-950/50 ring-1 ring-blue-900/50 rounded px-2 py-1 overflow-hidden"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-blue-400">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          rows={4}
          value={message}
          onChange={handleMessageChange}
          // placeholder="Message"
          className="w-full text-white bg-primary-clr dark:bg-gray-900 backdrop-blur-md border border-blue-950/50 ring-1 ring-blue-900/50 rounded px-2 py-1 overflow-hidden"
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message}</span>
        )}
      </div>
      <motion.div variants={fadeInOut("up", "spring", 0.4, 0.5)}>
        <Button
          type="submit"
          disabled={isSubmitting || Object.values(errors).some(Boolean)}
          size="lg"
          effect="gooeyRight"
          className={`w-full bg-blue-500 hover:bg-blue-500/50 text-white text-md md:text-lg font-bold ${
            (isSubmitting || Object.values(errors).some(Boolean)) &&
            "opacity-50 cursor-not-allowed active:translate-y-0"
          } rounded md:px-4 lg:px-6 xl:px-8 overflow-hidden`}
        >
          {isSubmitting ? "Submitting..." : "Send Message"}
        </Button>
      </motion.div>
    </motion.form>
  );
};

const ContactInfo = ({ contactUsInfoData }) => {
  const { contactUsInfo, socialLinks } = contactUsInfoData;

  return (
    <div className="w-full h-full space-y-6 md:space-y-8 lg:space-y-10 overflow-hidde">
      <motion.div
        variants={fadeInOut("left", "spring", 0.3, 0.5)}
        className="w-full h-fit bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
      >
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="space-y-2 lg:space-y-4"
        >
          <motion.h4
            variants={fadeInOut("down", "tween", 0.2, 0.5)}
            className="text-white text-lg md:text-xl lg:text-2xl font-semibold"
          >
            {contactUsInfo.heading}
          </motion.h4>

          {[
            {
              icon: MdLocationPin,
              title: "Address",
              content: contactUsInfo.links.address.text,
              link: contactUsInfo.links.address.link,
            },
            {
              icon: MdLocalPhone,
              title: "Phone",
              content: contactUsInfo.links.phone.text,
              link: contactUsInfo.links.phone.link,
            },
            {
              icon: MdMail,
              title: "Email",
              content: contactUsInfo.links.email.text,
              link: contactUsInfo.links.email.link,
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
                <p className="text-blue-400 text-balance text-sm md:text-md lg:text-lg">
                  <Link href={item.link} className="w-fit hover-link-underline">
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
        className="w-full h-fit bg-primary-clr-2/60 dark:bg-primary-clr-2/60 backdrop-blur-md border border-sky-950 ring-1 ring-sky-900 rounded-lg p-4 md:p-6 lg:p-8 overflow-hidden"
      >
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          className="space-y-2 lg:space-y-4"
        >
          <motion.h4
            variants={fadeInOut("down", "tween", 0.2, 0.5)}
            className="text-white text-lg md:text-xl lg:text-2xl font-semibold"
          >
            {socialLinks.heading}
          </motion.h4>

          <motion.div
            variants={fadeInOut("up", "spring", 0.3, 0.5)}
            className="group w-fit h-fit flex gap-4"
          >
            {socialLinks.links.map((social, i) => (
              <Link
                key={i}
                href={social.link}
                title={`Follow us on ${social.label}`}
                target="_blank"
                className="relative opacity-80 hover:opacity-100 hover:scale-125 transition-all ease-in-out duration-300"
              >
                {getSocialIcon(social.label)}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const getSocialIcon = (label) => {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("linkedin"))
    return <FaLinkedin size={25} className="fill-sky-500 font-semibold" />;
  if (normalizedLabel.includes("twitter") || normalizedLabel.includes("x"))
    return <FaXTwitter size={25} className="fill-sky-500 font-semibold" />;
  if (normalizedLabel.includes("facebook") || normalizedLabel.includes("fb"))
    return <FaFacebook size={25} className="fill-sky-500 font-semibold" />;
  if (normalizedLabel.includes("instagram") || normalizedLabel.includes("ig"))
    return <FaInstagram size={25} className="fill-sky-500 font-semibold" />;

  return <FaLinkedin size={25} className="fill-sky-500 font-semibold" />;
};

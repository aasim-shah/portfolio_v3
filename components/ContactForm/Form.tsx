"use client"
import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../ui/Loader";
import SuccessForm from "../ui/SuccessForm";
import { formVariants } from "@/animation/varients";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", 
  });

  const validate = () => {
    if (!data.email.includes("@")) {
      setErrorOnSubmit(true);
      return false;
    }
    if (data.honeypot) { // if filled, treat as spam
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setLoader(true);

    // Simulated API call
    setTimeout(() => {
      setLoader(false);
      setErrorOnSubmit(false);
      setData({ name: "", email: "", message: "", honeypot: "" });
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      viewport={{ once: true }}
      className="flex flex-col w-full gap-0"
    >
      {isSubmitting ? (
        <div className="h-full min-h-[350px] w-full flex flex-col items-center justify-center bg-dark-gray-2 rounded-xl border border-dark-gray-3 select-none">
          {loader ? <Loader /> : <SuccessForm action={errorOnSubmit ? "error" : "success"} />}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="hidden">
            <input
              value={data.honeypot}
              onChange={e => setData({ ...data, honeypot: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="p-4 rounded-lg bg-dark-gray-2 text-very-light-gray outline-none"
              name="name"
              placeholder="Name"
              type="text"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              required
            />
            <input
              className="p-4 rounded-lg bg-dark-gray-2 text-very-light-gray outline-none"
              name="email"
              placeholder="Email"
              type="email"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <textarea
            className="p-4 rounded-lg bg-dark-gray-2 text-very-light-gray outline-none resize-y min-h-56 max-h-96"
            name="message"
            placeholder="Message"
            rows={8}
            value={data.message}
            onChange={e => setData({ ...data, message: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-almost-black text-white p-4 rounded-lg hover:bg-dark-gray-4 transition"
          >
            Send Your Message
          </button>

          <p className="text-center text-light-gray-2 text-sm">
            Or email directly at{" "}
            <a href="mailto:contact@aasimshah.com" className="text-blue-600 hover:underline">
              contact@aasimshah.com
            </a>
          </p>
        </form>
      )}
    </motion.div>
  );
}

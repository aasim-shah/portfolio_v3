"use client"
import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../ui/Loader";
import SuccessForm from "../ui/SuccessForm";
import { formVariants } from "@/animation/varients";
import { ArrowUpRight } from "lucide-react";

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
        <div className="flex min-h-[350px] w-full select-none flex-col items-center justify-center rounded-2xl border border-dark-gray-4 bg-very-dark-gray">
          {loader ? <Loader /> : <SuccessForm action={errorOnSubmit ? "error" : "success"} />}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="hidden">
            <input
              value={data.honeypot}
              onChange={e => setData({ ...data, honeypot: e.target.value })}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.16em] text-light-gray-1">Name</span>
              <input
                className="min-h-12 rounded-xl border border-dark-gray-4 bg-very-dark-gray px-4 text-sm text-very-light-gray outline-none transition-colors placeholder:text-medium-gray focus:border-dark-gray-8"
                name="name"
                placeholder="Your name"
                type="text"
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.16em] text-light-gray-1">Email</span>
              <input
                className="min-h-12 rounded-xl border border-dark-gray-4 bg-very-dark-gray px-4 text-sm text-very-light-gray outline-none transition-colors placeholder:text-medium-gray focus:border-dark-gray-8"
                name="email"
                placeholder="you@company.com"
                type="email"
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                required
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="font-IBM_Plex_Mono text-[8px] uppercase tracking-[0.16em] text-light-gray-1">Project details</span>
            <textarea
              className="min-h-48 max-h-96 resize-y overflow-x-hidden rounded-xl border border-dark-gray-4 bg-very-dark-gray p-4 text-sm leading-6 text-very-light-gray outline-none transition-colors placeholder:text-medium-gray focus:border-dark-gray-8"
              name="message"
              wrap="soft"
              placeholder="Tell me about the product, current stage, scope, and timeline."
              rows={7}
              value={data.message}
              onChange={e => setData({ ...data, message: e.target.value })}
              required
            />
          </label>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-xs font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Send enquiry <ArrowUpRight size={14} />
            </button>

            <p className="text-xs text-light-gray-1">
              Prefer email?{" "}
              <a href="mailto:contact@aasimshah.com" className="text-light-gray-3 transition-colors hover:text-white">
                Write directly
              </a>
            </p>
          </div>
        </form>
      )}
    </motion.div>
  );
}

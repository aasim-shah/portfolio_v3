"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { myServicesPlans } from "@/data";

export default function ServicesPlansGrid() {
  return (
    <div className="flex-0 w-full gap-[10px] h-min grid justify-center overflow-visible p-0 relative grid-cols-1 lg:grid-cols-[repeat(2,minmax(50px,1fr))] lg:grid-rows-[repeat(2,min-content)] ">
      {myServicesPlans?.map((plan, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          className="place-self-start h-auto w-full relative"
          key={plan.id}
        >
          <div className="rounded-xl flex flexFlow items-end place-items-end gap-5 h-min p-6 relative border bg-very-dark-gray border-dark-gray-3 ">
            <div className="flex flex-col gap-4 h-min p-0 relative w-full">
              {/* Top Section */}
              <div className="flex justify-between items-center h-min w-full">
                {/* Left Section with Icon and Service */}
                <div className="flex items-center gap-2 flex-1">
                  <div className="bg-dark-gray-3 border border-border-color rounded-lg flex items-center justify-center p-2 w-auto">
                    <div className="aspect-square w-[24px] h-[24px] overflow-hidden">
                      <Image
                        width={24}
                        height={24}
                        src={plan.icon}
                        alt=""
                        aria-hidden="true"
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 justify-start">
                    <p className="font-bold text-xl text-very-light-gray">
                      {plan.service}
                    </p>
                  </div>
                </div>

                {/* Right Section with Price */}
                <div className="flex items-center gap-0">
                  <div className="flex flex-col justify-start">
                    <p className="text-light-gray-3 font-semibold text-lg">
                      {plan.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Section with Description */}
              <div className="flex flex-col h-auto whitespace-pre-wrap w-full">
                <p className="font-semibold text-[15px] text-light-gray-2">
                  {plan.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 h-auto w-full rounded-xl bg-darkest-gray py-2">
              <InfoRow label="Scope" value={plan.completedWorks} />
              <InfoRow label="Experience" value={plan.experience} />
              <InfoRow label="Engagement" value={plan.totalHoursWorked} />
            </div>
            <div className="h-auto w-full">
              <Link
                href={plan.link}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Make Offer
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: string | number;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center last:border-transparent border-b border-dark-gray-3 py-2 px-4 w-full">
      <div className="flex-1">
        <p className="font-medium text-[15px] text-light-gray-2">{label}</p>
      </div>
      <div className="flex-1 text-right">
        <p className="font-bold text-lg text-light-gray-4">{value}</p>
      </div>
    </div>
  );
};

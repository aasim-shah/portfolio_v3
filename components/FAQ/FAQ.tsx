"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence, } from "framer-motion"
import type { FAQ as FAQType } from "@/types"
import { Plus } from "lucide-react"

type FAQProps = {
    data: FAQType[]
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
    const [openIndices, setOpenIndices] = useState<number[]>([])

    const handleToggle = (index: number) => {
        setOpenIndices((prevIndices) =>
            prevIndices.includes(index) ? prevIndices.filter((i) => i !== index) : [...prevIndices, index],
        )
    }

    return (
        <div className="w-full">
            <div className="grid w-full grid-cols-1 border-t border-dark-gray-4 transition-all duration-500">
                {data.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{
                            once: true,
                        }}
                        className="flex w-full select-none border-b border-dark-gray-4"
                    >
                        <div className="w-full">
                            <motion.div
                                onClick={() => handleToggle(index)}
                                className="cursor-pointer py-6 text-white transition-colors duration-300 hover:bg-white/[0.015] sm:px-1"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex items-start gap-5">
                                        <span className="pt-1 font-IBM_Plex_Mono text-[8px] text-light-gray-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <motion.p
                                            animate={{
                                                color: openIndices.includes(index) ? "rgb(230, 230, 230)" : "rgb(153, 153, 153)",
                                            }}
                                            className="max-w-2xl text-[15px] font-medium sm:text-base"
                                        >
                                            {faq.question}
                                        </motion.p>
                                    </div>
                                    <motion.div
                                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-dark-gray-6 text-light-gray-2"
                                        animate={{ rotate: openIndices.includes(index) ? 45 : 0 }}
                                    >
                                        <Plus size={14} />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {openIndices.includes(index) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-9 my-4 h-px max-w-2xl bg-dark-gray-4"
                                            />
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.3 }}
                                                className="ml-9 max-w-2xl text-sm font-normal leading-7 text-light-gray-2"
                                            >
                                                {faq.answer}
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default FAQ;

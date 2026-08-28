"use client"
import type React from "react"
import { useId, useState } from "react"
import { motion } from "framer-motion"
import type { FAQ as FAQType } from "@/types"
import { Plus } from "lucide-react"

type FAQProps = {
    data: FAQType[]
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
    const [openIndices, setOpenIndices] = useState<number[]>([])
    const baseId = useId()

    const handleToggle = (index: number) => {
        setOpenIndices((prevIndices) =>
            prevIndices.includes(index) ? prevIndices.filter((i) => i !== index) : [...prevIndices, index],
        )
    }

    return (
        <div className="w-full">
            <div className="grid w-full grid-cols-1 border-t border-dark-gray-4">
                {data.map((faq, index) => {
                    const isOpen = openIndices.includes(index)
                    const questionId = `${baseId}-q-${index}`
                    const answerId = `${baseId}-a-${index}`
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="w-full border-b border-dark-gray-4"
                        >
                            <h3>
                                <button
                                    type="button"
                                    id={questionId}
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    onClick={() => handleToggle(index)}
                                    className="flex w-full items-start justify-between gap-6 py-6 text-left text-white transition-colors duration-300 hover:bg-white/[0.015] sm:px-1"
                                >
                                    <span className="flex items-start gap-5">
                                        <span className="pt-1 font-IBM_Plex_Mono text-[8px] text-light-gray-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                            className={`max-w-2xl text-[15px] font-medium sm:text-base ${isOpen ? "text-[rgb(230,230,230)]" : "text-light-gray-3"}`}
                                        >
                                            {faq.question}
                                        </span>
                                    </span>
                                    <motion.span
                                        aria-hidden="true"
                                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-dark-gray-6 text-light-gray-2"
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                    >
                                        <Plus size={14} />
                                    </motion.span>
                                </button>
                            </h3>

                            <motion.div
                                id={answerId}
                                role="region"
                                aria-labelledby={questionId}
                                initial={false}
                                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="ml-9 max-w-2xl pb-6 text-sm font-normal leading-7 text-light-gray-2">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default FAQ;

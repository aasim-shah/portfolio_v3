"use client";
import Link from 'next/link'
import React from 'react'
import { itemVariants, listVariants } from "@/animation/varients";
import { motion } from "framer-motion";
import { FollowerData } from '@/types';
import { ArrowUpRight } from 'lucide-react';


interface ContactFormProps {
    followerData: FollowerData[];
}


export default function FollowerLists({ followerData }: ContactFormProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={listVariants}
            viewport={{ once: true }}
            className="flex flex-col"
        >
            <ul className="space-y-5">
                {followerData.map((data) => (
                    <motion.li key={data.platform} variants={itemVariants}>
                        <Link
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 transition-colors"
                        >
                            <div className="flex min-w-0 flex-1 flex-col">
                                <p className="text-xs text-light-gray-1">{data.platform}</p>
                                <p className="mt-1 truncate text-sm font-medium text-light-gray-3 transition-colors group-hover:text-white">{data.followers}</p>
                            </div>
                            <ArrowUpRight className="text-light-gray-1 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" size={15} />
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    )
}

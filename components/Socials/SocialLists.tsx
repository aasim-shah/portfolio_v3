"use client"
import { socialLists } from '@/data'
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion"

export default function SocialLists() {
    return (
        <aside className='sticky top-0 z-10 hidden h-screen w-full max-w-[13%] flex-none bg-darkest-gray lg:block'>
            <div className="relative flex h-full flex-col flex-nowrap items-start justify-center gap-2 overflow-hidden bg-darkest-gray p-0">
                {/* middle  */}
                <div className="relative flex h-full flex-1 flex-col flex-nowrap items-start justify-center overflow-hidden border-l border-border-color bg-darkest-gray p-[20px_0px_40px_30px]">
                    <motion.ul
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1, }}
                        className='flex items-center gap-5 flex-col'>
                        {
                            socialLists.map((social, index) => (
                                <motion.li
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{
                                        once: true,
                                    }}
                                    key={social.id} className="flex items-center gap-10 ">
                                    <Link href={social.link} target="_blank" rel="noopener noreferrer" className='bg-very-dark-gray hover:bg-dark-gray-3 transition-all duration-300 border border-dark-gray-3 p-3 group rounded-xl'>
                                        <span className='text-light-gray-1 text-sm group-hover:text-light-gray-3 transition-all duration-300'>
                                            {social.icon}
                                        </span>
                                    </Link>
                                </motion.li>
                            ))
                        }
                    </motion.ul>
                </div>
            </div>
        </aside >
    )
}

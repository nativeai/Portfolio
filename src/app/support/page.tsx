'use client'

import { wallets, supportSites } from "../../data"
import QRCode from "react-qr-code"
import Image from "next/image"
import { motion } from 'framer-motion'

export default function SupportPage() {
  return (
    <div className="px-6 py-2">
      <div className="grid gap-9 md:grid-cols-1">
        {supportSites.map((support, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container
              px-5
              py-24
              ml-auto
              flex
              md:items-center
              lg:items-start
              md:flex-row md:flex-nowrap
              flex-wrap flex-col shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
            key={i}
          >
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left max-w-sm">
              <a href={support.url}>
                <h2 className="my-3 text-2xl font-bold font-hpr">
                </h2>
                <div className="relative w-full h-48">
                  <Image
                    src={support.image}
                    alt="avatar"
                    className="mx-auto border rounded-r-lg object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
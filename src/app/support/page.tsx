'use client'

import { wallets, supportSites } from "../../data"
import QRCode from "react-qr-code"
import Image from "next/image"
import { motion } from 'framer-motion'

export default function SupportPage() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold font-hpr text-center">Support My Work</h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
          If you find my work helpful and would like to support my projects, consider buying me a coffee!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportSites.map((support, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i}
            >
              <a 
                href={support.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-dark-200 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                >
                  <h2 className="mb-4 text-xl font-bold font-hpr text-gray-800 dark:text-white text-center">
                    {support.title}
                  </h2>
                  <div className="relative w-32 h-32 mx-auto mb-4 flex-shrink-0">
                    <Image
                      src={support.image}
                      alt={support.title}
                      className="rounded-lg object-contain"
                      fill
                      sizes="128px"
                    />
                  </div>
                  <p className="text-blue hover:text-blue-600 font-medium text-center mt-auto">
                    Click to support →
                  </p>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
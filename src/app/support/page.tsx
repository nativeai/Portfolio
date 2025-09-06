'use client'

import { wallets, supportSites } from "../../data"
import QRCode from "react-qr-code"
import Image from "next/image"
import { motion } from 'framer-motion'

export default function SupportPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="mb-8 text-4xl font-bold font-hpr text-center">Support My Work</h1>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
          If you find my work helpful and would like to support my projects, consider buying me a coffee!
        </p>
        
        {supportSites.map((support, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            key={i}
            className="mb-8"
          >
            <a 
              href={support.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-dark-200 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <h2 className="mb-6 text-2xl font-bold font-hpr text-gray-800 dark:text-white">
                  {support.title}
                </h2>
                <div className="relative w-64 h-64 mx-auto mb-4">
                  <Image
                    src={support.image}
                    alt={support.title}
                    className="rounded-lg object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>
                <p className="text-blue hover:text-blue-600 font-medium">
                  Click to support →
                </p>
              </motion.div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
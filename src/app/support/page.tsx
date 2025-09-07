'use client'

import { supportSites } from "../../data"
import Image from "next/image"
import { motion } from 'framer-motion'

interface SupportItem {
  title: string
  url: string
  image: string
}

interface SupportCardProps {
  support: SupportItem
  index: number
}

function SupportCard({ support, index }: SupportCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <a 
        href={support.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`Support via ${support.title}`}
      >
        <div className="bg-white dark:bg-dark-200 rounded-lg p-3 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col items-center text-center group-hover:border-blue-300 dark:group-hover:border-blue-500">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
            {support.title}
          </h3>
          <div className="text-blue hover:text-blue-600 font-medium text-xs mt-auto flex items-center gap-1">
            <svg 
              className="w-3 h-3 transition-transform group-hover:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function SupportPage() {
  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="mb-4 text-2xl sm:text-3xl font-bold">
            Support My Work
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            If you find my work helpful, consider buying me a coffee!
          </p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xs mx-auto">
          {supportSites.map((support: SupportItem, index: number) => (
            <SupportCard 
              key={support.title} 
              support={support} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
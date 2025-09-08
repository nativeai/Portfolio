'use client'

import { supportSites } from "../../data"
import Image from "next/image"
import { motion } from 'framer-motion'
import ResumeCard from "../../components/ResumeCard"

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
        <div className="bg-white dark:bg-dark-200 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 h-full flex items-center justify-center group-hover:border-blue-300 dark:group-hover:border-blue-500">
          <Image
            src={support.image}
            alt={`${support.title} logo`}
            width={140}
            height={140}
            className="rounded-lg transition-transform group-hover:scale-105"
            priority
          />
        </div>
      </a>
    </motion.div>
  )
}

export default function SupportPage() {
  return (
    <div className="flex flex-col flex-grow px-4 py-2 overflow-hidden h-full">
      {/* Resume Card with Navigation */}
      <ResumeCard />
      
      <div className="flex-grow overflow-y-auto scrollbar-hide">
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
        
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
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
        </div>
        
        {/* Bottom Padding for Mobile Scroll */}
        <div className="h-6 flex-shrink-0"></div>
      </div>
    </div>
  )
}
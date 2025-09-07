'use client'

import { useState, useEffect } from 'react'
import ServiceCard from "../components/ServiceCard"
import SkeletonCard from "../components/SkeletonCard"
import ErrorBoundary from "../components/ErrorBoundary"
import { services } from "../data"
import { motion } from 'framer-motion'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading time and potential error handling
    const timer = setTimeout(() => {
      try {
        if (services && services.length > 0) {
          setIsLoading(false)
        } else {
          setError("No services data available")
        }
      } catch (err) {
        setError("Failed to load services")
        setIsLoading(false)
      }
    }, 800) // Reduced from previous longer loading

    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className="flex flex-col flex-grow px-4 py-8 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center h-full"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-100 dark:bg-error-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Failed to Load Services</h2>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col flex-grow overflow-hidden h-full"
      >
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="sr-only">Services and Skills Overview</h1>
        </div>
        
        {/* Services Grid Container */}
        <div className="flex-grow overflow-y-auto scrollbar-hide">
          <div className="grid gap-4 sm:gap-6 md:gap-8 py-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 auto-rows-fr">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }, (_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[480px]"
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : (
              // Actual service cards
              services.map((service, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.05,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.15 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  className="w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[480px]"
                  key={service.title}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))
            )}
          </div>
          
          {/* Bottom Padding for Mobile Scroll */}
          <div className="h-6 flex-shrink-0"></div>
        </div>
      </motion.div>
    </ErrorBoundary>
  )
}
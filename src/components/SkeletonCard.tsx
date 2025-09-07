import { motion } from 'framer-motion'

interface SkeletonCardProps {
  className?: string
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`h-full flex flex-col rounded-lg overflow-hidden shadow-lg bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-600 ${className}`}>
      {/* Image Skeleton */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 flex-shrink-0">
        <motion.div 
          className="w-full h-full bg-gray-200 dark:bg-dark-300"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Content Skeleton */}
      <div className="flex-grow flex flex-col p-4 space-y-4">
        {/* Title Skeleton */}
        <motion.div 
          className="h-6 bg-gray-200 dark:bg-dark-300 rounded w-3/4 mx-auto"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1
          }}
        />
        
        {/* Description Skeleton */}
        <div className="space-y-2 flex-grow">
          <motion.div 
            className="h-4 bg-gray-200 dark:bg-dark-300 rounded w-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <motion.div 
            className="h-4 bg-gray-200 dark:bg-dark-300 rounded w-4/5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
          <motion.div 
            className="h-4 bg-gray-200 dark:bg-dark-300 rounded w-2/3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
          />
        </div>
        
        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="h-6 bg-gray-200 dark:bg-dark-300 rounded-full w-16"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1 * i + 0.5
              }}
            />
          ))}
        </div>
        
        {/* Icon Skeleton */}
        <div className="flex justify-center pt-2">
          <motion.div 
            className="w-16 h-16 bg-gray-200 dark:bg-dark-300 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
          />
        </div>
      </div>
    </div>
  )
}
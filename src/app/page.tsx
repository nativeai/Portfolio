'use client'

import ServiceCard from "../components/ServiceCard"
import { services } from "../data"
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col flex-grow px-6 pt-1"
    >
      <div
        className="flex-grow p-4 mt-5 dark:bg-dark-100"
        style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
      >
        <div className="grid gap-2 my-2 md:grid-cols-2">
          {services.map((service) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="col-span-2 p-2 rounded-lg md:col-span-1"
              key={service.title}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
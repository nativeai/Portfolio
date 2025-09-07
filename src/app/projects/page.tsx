'use client'

import { useState } from "react"
import ProjectCard from "../../components/ProjectCard"
import ProjectsNavbar from "../../components/ProjectsNavbar"
import { projects as projectsData } from "../../data"
import { Category } from "../../types"
import { motion } from 'framer-motion'

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData)
  const [active, setActive] = useState("all")

  const handlerFilterCategory = (category: Category | "all") => {
    if (category === "all") {
      setProjects(projectsData)
      setActive(category)
      return
    }

    const newArray = projectsData.filter((project) =>
      project.category.includes(category)
    )
    setProjects(newArray)
    setActive(category)
  }

  return (
    <div className="px-3 py-2 sm:px-5 sm:py-2 overflow-y-auto h-[calc(100vh-200px)] sm:h-[65vh]">
      <ProjectsNavbar
        handlerFilterCategory={handlerFilterCategory}
        active={active}
      />

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 my-3 sm:my-3">
        {projects.map((project) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="p-2 sm:p-2 bg-gray-200 rounded-lg dark:bg-dark-200"
            key={project.name}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
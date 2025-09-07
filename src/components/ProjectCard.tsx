import { FunctionComponent, useState } from "react";
import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { IProject } from "../types";
import { motion } from "framer-motion";

import Image from "next/image";

const ProjectCard: FunctionComponent<{
  project: IProject;
}> = ({
  project: {
    name,
    image_path,
    category,
    deployed_url,
    description,
    github_url,
    key_techs,
  },
}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="h-full">
      <div className="relative w-full aspect-video mb-3 overflow-hidden rounded-lg">
        <Image
          src={image_path}
          alt={name}
          fill
          className="cursor-pointer object-cover hover:scale-105 transition-transform duration-300"
          onClick={() => setShowDetail(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <p className="text-center text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 px-1">{name}</p>

      {showDetail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl max-h-full my-4 sm:my-0 overflow-y-auto bg-gray-100 dark:bg-dark-100 rounded-lg shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="order-2 md:order-1">
                <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={image_path}
                    alt={name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-3">
                  <a
                    href={github_url}
                    className="flex items-center justify-center px-4 py-2 space-x-2 text-sm sm:text-lg bg-gray-200 dark:bg-dark-200 rounded-md hover:bg-gray-300 dark:hover:bg-dark-300 transition-colors"
                  >
                    <AiFillGithub className="text-lg sm:text-xl" /> <span>Github</span>
                  </a>
                  <a
                    href={deployed_url}
                    className="flex items-center justify-center px-4 py-2 space-x-2 text-sm sm:text-lg bg-gray-200 dark:bg-dark-200 rounded-md hover:bg-gray-300 dark:hover:bg-dark-300 transition-colors"
                  >
                    <AiFillProject className="text-lg sm:text-xl" /> <span>Project</span>
                  </a>
                </div>
              </div>

              <div className="text-black dark:text-white order-1 md:order-2">
                <h2 className="mb-3 text-lg sm:text-xl md:text-2xl font-medium">{name}</h2>
                <h3 className="mb-3 text-sm sm:text-base font-medium leading-relaxed">{description}</h3>

                <div className="flex flex-wrap mt-5 gap-2 text-xs sm:text-sm tracking-wider">
                  {key_techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-200 dark:bg-dark-200 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="absolute p-1.5 sm:p-2 bg-gray-200 dark:bg-dark-200 rounded-full top-2 right-2 sm:top-3 sm:right-3 focus:outline-none hover:bg-gray-300 dark:hover:bg-dark-300 transition-colors"
            >
              <MdClose size={24} className="sm:w-7 sm:h-7" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectCard;

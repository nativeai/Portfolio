import { FunctionComponent } from "react";
import { Service } from "../types";
import { motion } from 'framer-motion'

const ServiceCard: FunctionComponent<{ service: Service }> = ({
  service: { Icon, title, about, url, tags },
}) => {
  //XSS attack :( on our portfolio btw, as an alternate use npm i dom purify
  function createMarkup() {
    return {
      __html: about,
    };
  }

  // Create a preview version of the about text (first 80 characters)
  const getPreviewText = (text: string) => {
    const plainText = text.replace(/<[^>]*>/g, ''); // Strip HTML tags
    return plainText.length > 80 ? plainText.substring(0, 80) + '...' : plainText;
  };

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden shadow-lg cursor-pointer border border-gray-300 dark:border-gray-600 hover:shadow-hover dark:hover:shadow-hover-dark hover:border-primary-400 dark:hover:border-primary-500 transform hover:-translate-y-1 transition-all duration-standard ease-smooth bg-white dark:bg-dark-200 isolate">
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden flex-shrink-0">
        <img 
          src={url} 
          alt={`${title} service illustration`}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-standard ease-smooth" 
          onClick={() => {
            const ref = document.getElementById(title.replace(/\s+/g, '-').toLowerCase());
            const details = (ref as HTMLDetailsElement);
            if (details) {
              details.open = !details.open;
            }
          }}
          loading="lazy"
        />
      </div>
      
      {/* Content Section */}
      <div className="flex-grow flex flex-col">
        <details 
          id={title.replace(/\s+/g, '-').toLowerCase()} 
          className="cursor-pointer flex-grow flex flex-col"
        >
          <summary className="font-bold text-base sm:text-lg md:text-xl px-4 py-3 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset list-none [&::-webkit-details-marker]:hidden">
            <div className="text-center">
              <span className="block mb-2">{title}</span>
              <p className="text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-400 leading-relaxed">
                {getPreviewText(about)}
              </p>
            </div>
          </summary>
          
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="flex-grow flex flex-col overflow-hidden isolate"
          >
            {/* Description */}
            <div className="px-4 py-4 flex-grow">
              <p
                className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={createMarkup()}
              />
            </div>
            
            {/* Tags */}
            <div className="px-4 pt-2 pb-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full px-3 py-1 text-xs sm:text-sm font-medium border border-primary-200 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-fast ease-smooth"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Icon */}
            <div className="flex justify-center items-center pb-4 pt-2 px-8 overflow-hidden relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden rounded-full relative bg-primary-50 dark:bg-primary-900/30 shadow-sm">
                <motion.div
                  whileHover={{ rotate: 2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
                  style={{ clipPath: 'circle(50% at 50% 50%)' }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </details>
      </div>
    </div>
  );
};

export default ServiceCard;
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

  return (
    <div className="rounded overflow-hidden shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200 m-auto font-hpr bg-gray-200 dark:bg-dark-200">
      <img src={url} alt="avatar" className="w-full object-cover h-60 max-h-full" 
        onClick={() => {
          var ref = document.getElementById(title);
          const details = (ref as HTMLDetailsElement);
          details.open = !details.open;
        }} />
      <details id={title} className="cursor-pointer">
        <summary className="font-bold text-2xl mx-auto px-auto block w-max">{title}</summary>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}>
        <div className="px-6 py-4">
          <p
            className="dark:text-blue text-base"
            dangerouslySetInnerHTML={createMarkup()}
          />
        </div>
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-200 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <Icon className="px-2 py-1 my-3 w-24 h-24 text-blue mx-auto" />
        </motion.div>
      </details>
    </div>
  );
};

export default ServiceCard;

import { FunctionComponent, useCallback } from "react";
import { Service } from "../types";
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

const ServiceCard: FunctionComponent<{ service: Service }> = ({
  service: { Icon, title, about, url, tags },
}) => {
  const isValidImageUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:', 'data:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  function createMarkup() {
    return {
      __html: DOMPurify.sanitize(about, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'target'],
        ALLOW_DATA_ATTR: false,
      }),
    };
  }

  const handleImageClick = useCallback(() => {
    const safeId = title.replace(/[^a-zA-Z0-9-_]/g, '');
    const ref = document.getElementById(safeId);
    if (ref instanceof HTMLDetailsElement) {
      ref.open = !ref.open;
    }
  }, [title]);

  return (
    <div className="rounded overflow-hidden shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200 m-auto font-hpr bg-gray-200 dark:bg-dark-200">
      {isValidImageUrl(url) ? (
        <img
          src={url}
          alt="avatar"
          className="w-full object-cover h-60 max-h-full"
          onClick={handleImageClick}
        />
      ) : (
        <div className="w-full h-60 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Invalid image URL</span>
        </div>
      )}
      <details id={title.replace(/[^a-zA-Z0-9-_]/g, '')} className="cursor-pointer">
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

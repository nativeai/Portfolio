import { snippets, repositories } from "../data";
import Highlight from "react-highlight";
import { motion } from 'framer-motion'

const Snippets = () => {
  return (
    <div className="px-6 py-2 font-hpr">
      <div className="grid">
            {snippets.map((snippet, i) => (
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }} 
              whileHover={{ scale: 1.5 }}
              className="rounded overflow-hidden shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200 float-left	scale-50">
                <h5 className="my-3 text-2xl font-bold">
                  {snippet.environment}
                </h5>
                <p className="my-3 text-2xl">
                  {snippet.description}
                </p>
                <Highlight className="highlight" language={snippet.language}>
                  {snippet.snippet}
                </Highlight>
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Snippets;

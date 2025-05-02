import React from 'react';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className='bg-gray-900 text-white min-h-screen px-6 py-10'>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className='text-5xl font-bold text-center text-indigo-400 mb-4'>Elad Sertshuk</h1>
        <p className='text-center text-gray-400 mb-12'>Software Engineer | .NET, Python, Angular, React</p>
      </motion.div>

      <section className='mb-16'>
        <h2 className='text-3xl font-semibold text-indigo-300 mb-4'>Projects</h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {[1, 2, 3].map(i => (
            <motion.div whileHover={{ scale: 1.05 }} key={i} className='bg-gray-800 p-6 rounded-xl shadow'>
              <h3 className='text-xl font-bold mb-2'>Project {i}</h3>
              <p className='text-gray-400 mb-2'>Short description of project {i} goes here.</p>
              <a href='#' className='text-indigo-400 hover:underline'>View on GitHub</a>
            </motion.div>
          ))}
        </div>
      </section>

      <section className='mb-16'>
        <h2 className='text-3xl font-semibold text-indigo-300 mb-4'>Contact</h2>
        <p>Email me at: <a className='text-indigo-400 underline' href='mailto:elad@example.com'>elad@example.com</a></p>
      </section>
    </div>
  );
};
export default App;

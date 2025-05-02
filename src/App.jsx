import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'REST API Backend (.NET)',
    description: 'A production-ready API with clean architecture, auth, and EF Core.',
    link: 'https://github.com/EladSertshuk/api-backend-dotnet'
  },
  {
    title: 'FastAPI Project',
    description: 'Lightweight Python API with SQLite and FastAPI.',
    link: 'https://github.com/EladSertshuk/api-backend-python'
  },
  {
    title: 'Angular Todo App',
    description: 'A small project using Angular and local storage for a todo list.',
    link: 'https://github.com/EladSertshuk/todo-angular'
  }
];

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-indigo-400">Elad Sertshuk</h1>
        <p className="text-xl text-gray-400">Software Engineer from Israel</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, index) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-indigo-300">{proj.title}</h2>
            <p className="mb-4 text-sm text-gray-400">{proj.description}</p>
            <a href={proj.link} target="_blank" rel="noopener noreferrer">
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">View on GitHub</button>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

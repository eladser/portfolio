import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: 'fas fa-laptop-code',
      color: 'from-blue-400 to-cyan-400',
      skills: [
        { name: 'JavaScript', level: 95, icon: 'fab fa-js-square' },
        { name: 'React', level: 90, icon: 'fab fa-react' },
        { name: 'HTML/CSS', level: 95, icon: 'fab fa-html5' },
        { name: 'TypeScript', level: 85, icon: 'fab fa-js-square' },
        { name: 'Tailwind CSS', level: 90, icon: 'fas fa-paint-brush' },
        { name: 'Angular', level: 80, icon: 'fab fa-angular' },
      ],
    },
    {
      title: 'Backend Development',
      icon: 'fas fa-server',
      color: 'from-green-400 to-emerald-400',
      skills: [
        { name: 'C#/.NET', level: 90, icon: 'fas fa-code' },
        { name: 'Node.js', level: 85, icon: 'fab fa-node-js' },
        { name: 'Python', level: 80, icon: 'fab fa-python' },
        { name: 'SQL Server', level: 85, icon: 'fas fa-database' },
        { name: 'PostgreSQL', level: 80, icon: 'fas fa-database' },
        { name: 'MongoDB', level: 75, icon: 'fas fa-leaf' },
      ],
    },
    {
      title: 'Developer Tools',
      icon: 'fas fa-tools',
      color: 'from-purple-400 to-pink-400',
      skills: [
        { name: 'Git/GitHub', level: 95, icon: 'fab fa-git-alt' },
        { name: 'VS Code', level: 95, icon: 'fas fa-code' },
        { name: 'Docker', level: 75, icon: 'fab fa-docker' },
        { name: 'GitHub Actions', level: 80, icon: 'fab fa-github' },
        { name: 'Postman', level: 85, icon: 'fas fa-paper-plane' },
        { name: 'DevTools', level: 90, icon: 'fas fa-bug' },
      ],
    },
    {
      title: 'Cloud & Deployment',
      icon: 'fas fa-cloud',
      color: 'from-orange-400 to-red-400',
      skills: [
        { name: 'Azure', level: 75, icon: 'fab fa-microsoft' },
        { name: 'GitHub Pages', level: 90, icon: 'fab fa-github' },
        { name: 'Netlify', level: 85, icon: 'fas fa-rocket' },
        { name: 'Vercel', level: 85, icon: 'fas fa-bolt' },
        { name: 'CI/CD', level: 80, icon: 'fas fa-sync-alt' },
        { name: 'AWS Basic', level: 60, icon: 'fab fa-aws' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <i className={`${category.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                      className="space-y-2"
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <i className={`${skill.icon} text-gray-600 dark:text-gray-400`}></i>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Always Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying current with the latest trends, 
              tools, and best practices in software development. Currently exploring advanced JavaScript 
              patterns and modern CSS techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Progressive Web Apps',
                'WebAssembly',
                'GraphQL',
                'Microservices',
                'Kubernetes',
                'Machine Learning',
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
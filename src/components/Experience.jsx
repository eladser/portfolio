import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const experiences = [
    {
      id: 1,
      title: 'Open Source Developer',
      company: 'Self-Directed Projects',
      period: '2023 - Present',
      location: 'Remote',
      type: 'Open Source',
      description: 'Created and maintain .NET Tools, a comprehensive toolkit with 30+ professional development utilities. Focus on developer experience, performance optimization, and community-driven development.',
      achievements: [
        'Built and launched .NET Tools with 30+ fully functional developer utilities',
        'Implemented 100% client-side processing for privacy and performance',
        'Created responsive, mobile-optimized UI with dark/light theme support',
        'Established comprehensive documentation and contribution guidelines',
        'Gained experience in modern web technologies and developer tool creation'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git', 'GitHub Pages', 'Progressive Web Apps'],
      icon: 'fas fa-code-branch',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Professional Development',
      period: '2020 - Present',
      location: 'Israel',
      type: 'Full-time',
      description: 'Full-stack software development with focus on .NET technologies, web applications, and system design. Experience in both frontend and backend development with modern frameworks.',
      achievements: [
        'Developed full-stack applications using .NET Core and modern frontend frameworks',
        'Implemented responsive web applications with React and Angular',
        'Worked with various databases including SQL Server and PostgreSQL',
        'Collaborated on code reviews and maintained high code quality standards',
        'Gained expertise in cloud deployment and DevOps practices'
      ],
      technologies: ['C#', '.NET Core', 'React', 'Angular', 'SQL Server', 'Azure', 'Git'],
      icon: 'fas fa-laptop-code',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 3,
      title: 'Learning & Development',
      company: 'Continuous Education',
      period: '2018 - 2020',
      location: 'Self-Directed',
      type: 'Education',
      description: 'Intensive self-directed learning in software development, focusing on modern web technologies, best practices, and industry standards. Built foundation in programming fundamentals and advanced concepts.',
      achievements: [
        'Mastered fundamental programming concepts and data structures',
        'Learned multiple programming languages and frameworks',
        'Built portfolio of practice projects and open source contributions',
        'Developed understanding of software architecture and design patterns',
        'Established strong foundation in version control and development workflows'
      ],
      technologies: ['JavaScript', 'Python', 'C#', 'HTML/CSS', 'Git', 'Database Design'],
      icon: 'fas fa-graduation-cap',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50">
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
              Experience & Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My path in software development, from learning fundamentals to creating tools that help developers worldwide
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-400 rounded-full z-10"></div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${exp.color}`}>
                            <i className={`${exp.icon} text-white text-xl`}></i>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {exp.title}
                            </h3>
                            <p className="text-blue-400 font-semibold">{exp.company}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                          {exp.type}
                        </span>
                      </div>

                      {/* Period and Location */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>
                          <i className="fas fa-calendar mr-2"></i>
                          {exp.period}
                        </span>
                        <span>
                          <i className="fas fa-map-marker-alt mr-2"></i>
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                              <i className="fas fa-check-circle text-green-400 mt-0.5 flex-shrink-0"></i>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Build Something Together
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always excited to collaborate on new projects and explore innovative solutions. 
              Whether it's building developer tools, web applications, or contributing to open source, 
              I'm ready to bring ideas to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <i className="fas fa-envelope mr-2"></i>
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
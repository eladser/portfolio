import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Building, ExternalLink, Award, TrendingUp, Users, Code2 } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const experiences = [
    {
      id: 1,
      position: 'Senior Full Stack Developer',
      company: 'Enterprise Solutions Ltd.',
      location: 'Israel',
      period: '2022 - Present',
      type: 'Full-time',
      current: true,
      description: 'Leading development of enterprise web applications and energy management systems. Architecting scalable solutions using .NET, React, and modern cloud technologies.',
      achievements: [
        'Developed comprehensive WEM Dashboard with real-time monitoring capabilities',
        'Implemented WebSocket-based communication for live data updates',
        'Designed and built role-based access control system',
        'Optimized application performance achieving 95+ Lighthouse scores',
        'Mentored junior developers and conducted code reviews'
      ],
      technologies: ['.NET 8', 'React', 'TypeScript', 'SignalR', 'Entity Framework', 'Azure', 'SQL Server'],
      highlights: {
        impact: 'Improved system efficiency by 40%',
        scale: 'Serving 10,000+ users',
        performance: '95+ Lighthouse Score'
      }
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'Israel',
      period: '2020 - 2022',
      type: 'Full-time',
      current: false,
      description: 'Developed modern web applications and developer tools. Focused on creating user-friendly interfaces and robust backend systems for various client projects.',
      achievements: [
        'Built and deployed .NET Tools - comprehensive developer toolkit with 30+ utilities',
        'Created responsive web applications using React and modern CSS frameworks',
        'Implemented CI/CD pipelines using GitHub Actions',
        'Collaborated with cross-functional teams on multiple projects',
        'Maintained 99.9% uptime for production applications'
      ],
      technologies: ['JavaScript', 'React', '.NET Core', 'HTML5/CSS3', 'GitHub Actions', 'Docker'],
      highlights: {
        impact: 'Reduced development time by 60%',
        scale: 'Global developer usage',
        performance: '100% Client-side Processing'
      }
    },
    {
      id: 3,
      position: 'Junior Software Developer',
      company: 'Digital Solutions Co.',
      location: 'Israel',
      period: '2019 - 2020',
      type: 'Full-time',
      current: false,
      description: 'Started my professional journey working on various web development projects. Gained experience in full-stack development and learned industry best practices.',
      achievements: [
        'Contributed to multiple client projects using various technologies',
        'Learned and implemented responsive design principles',
        'Participated in agile development processes',
        'Collaborated with senior developers to deliver quality solutions',
        'Gained experience in database design and optimization'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
      highlights: {
        impact: 'Delivered 15+ projects',
        scale: 'Multi-client portfolio',
        performance: 'Zero critical bugs'
      }
    }
  ];

  const skills = [
    { name: 'Leadership', icon: Users, description: 'Team management and mentoring' },
    { name: 'Architecture', icon: Building, description: 'System design and planning' },
    { name: 'Innovation', icon: Award, description: 'Creative problem solving' },
    { name: 'Growth', icon: TrendingUp, description: 'Continuous improvement' }
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
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
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
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My journey in software development, from junior developer to senior full-stack engineer
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />

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
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10 flex items-center justify-center">
                    {exp.current && (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      {/* Header */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {exp.position}
                            </h3>
                            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold">
                              <Building className="w-5 h-5" />
                              <span>{exp.company}</span>
                            </div>
                          </div>
                          {exp.current && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-medium">
                            {exp.type}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        {Object.entries(exp.highlights).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {value}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Professional Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Professional Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Beyond technical expertise, I bring strong leadership, communication, and problem-solving skills
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {skill.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ready for New Challenges
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                I'm always looking for opportunities to work on innovative projects that challenge me 
                to grow and make a meaningful impact. Let's discuss how I can contribute to your team's success.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  Let's Work Together
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/eladser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View My Work
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
import React, { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/portfolioData';
import { Badge } from './ui/badge';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">
            Career Journey
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Building impactful solutions across enterprise applications
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-2xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-3 top-10 w-6 h-6 rounded-full bg-cyan-500 border-4 border-slate-50 dark:border-slate-950 hidden lg:block group-hover:scale-125 transition-transform" />
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                      {exp.role}
                    </p>
                  </div>
                  <Badge variant="outline" className="self-start">
                    {exp.period}
                  </Badge>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {exp.summary}
                </p>

                <div className="space-y-3 pt-2">
                  {exp.impact.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.2 + idx * 0.1 + 0.3, duration: 0.4 }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

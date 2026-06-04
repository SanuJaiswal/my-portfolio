import React, { useEffect, useRef } from 'react';
import { Code2, FileCode, FileJson, Palette, Server, Box, Terminal, Cloud, Database, Coffee, Bug, Code } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { Badge } from './ui/badge';

const iconMap = {
  Code2, FileCode, FileJson, Palette, Server, Box, Terminal, Cloud, Database, Coffee, Bug, Code
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.group]) acc[skill.group] = [];
    acc[skill.group].push(skill);
    return acc;
  }, {});

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">
            Technical Skills
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Technologies & Tools
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {Object.entries(groupedSkills).map(([group, groupSkills]) => {
            const Icon = iconMap[groupSkills[0].icon] || Code;
            return (
              <motion.div
                key={group}
                variants={item}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-6 hover:shadow-xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {group}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {groupSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-white dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 cursor-pointer"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile, stats } from '../data/portfolioData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="about" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background with mouse follow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge variant="secondary" className="text-xs font-semibold tracking-wider uppercase px-3 py-1">
                  {profile.role}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {profile.name}
              </motion.h1>
              
              <motion.div 
                className="flex items-center space-x-2 text-slate-600 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </motion.div>
            </div>

            <motion.p 
              className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {profile.summary}
            </motion.p>

            <motion.div 
              className="space-y-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {profile.intro.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="group bg-slate-900 hover:bg-cyan-600 dark:bg-slate-100 dark:hover:bg-cyan-400 dark:text-slate-900 transition-all duration-300"
              >
                Get in touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('#projects')}
                className="border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300"
              >
                View projects
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center space-x-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              {profile.fiverrUrl && (
                <a
                  href={profile.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 hover:scale-110 transition-all duration-300 text-xs font-semibold"
                  title="Fiverr Profile"
                >
                  Fiverr
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Sidebar - Stats & Highlights */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Highlights Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Focus Areas
              </h3>
              <div className="space-y-3">
                {profile.highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-5 hover:shadow-lg hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

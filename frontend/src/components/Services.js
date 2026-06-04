import React, { useRef } from 'react';
import { Laptop, Palette, Server, Cloud, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { services, profile } from '../data/portfolioData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const iconMap = {
  Laptop,
  Palette,
  Server,
  Cloud
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">
            Freelance Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Services I Offer
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Professional web development services for businesses and startups worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Laptop;
            return (
              <motion.div
                key={service.id}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-2xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-cyan-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
            Let's build something amazing together. I'm available for freelance projects and ready to bring your ideas to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-cyan-600 dark:bg-slate-100 dark:hover:bg-cyan-400 dark:text-slate-900 transition-all duration-300"
              onClick={() => window.open(profile.fiverrGigUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Fiverr
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

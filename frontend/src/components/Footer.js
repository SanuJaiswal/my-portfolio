import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { profile } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {profile.name}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {profile.role}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {profile.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {['About', 'Services', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="flex space-x-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
            © {currentYear} {profile.name}. Made with{' '}
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" />
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12" id="contact">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Me</h2>
          <p className="mb-4">
            I am a QA Automation Engineer at Deloitte USI, specializing in Java
            and Selenium. I hold a B.Tech. degree in Information Technology from
            KIIT University, where I honed my skills in Data Structures &
            Algorithms and problem-solving using C++. My expertise extends to
            web development, where I've gained hands-on experience with HTML,
            CSS, JS, Java, and Spring Boot. Passionate about delivering quality
            solutions for diverse clients.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="hover:text-white transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </a>
            </li> */}
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Me</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/SanuJaiswal"
              target="_blank"
              className="hover:text-white transition-colors duration-300"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/sanujaiswal/"
              target="_blank"
              className="hover:text-white transition-colors duration-300"
            >
              Linkedin
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Find Me</h2>
          <p>Bengaluru, India</p>
          <p>560103</p>
          <p>Email: sjlskdevi49@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

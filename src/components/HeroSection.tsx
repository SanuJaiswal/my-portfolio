import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";

function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto pt-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-80 md:-top-20"
        fill="white"
      />
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Sanu Jaiswal
        </h1>
        <p className="mt-8 font-normal text-base md:text-lg text-neutral-300 max-w-2xl mx-auto md:w-3/4">
          I am a QA Automation Engineer at Deloitte USI, specializing in Java
          and Selenium. I hold a B.Tech. degree in Information Technology from
          KIIT University, where I honed my skills in Data Structures &
          Algorithms and problem-solving using C++. My expertise extends to web
          development, where I've gained hands-on experience with HTML, CSS, JS,
          Java, and Spring Boot. Passionate about delivering quality solutions
          for diverse clients.
        </p>
        <div className="mt-8">
          <a
            href="https://drive.google.com/file/d/15JuB23EjL34QiHQMGXCgflCy_IpR-Z2T/view?usp=sharing"
            target="_blank"
          >
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Get My Resume
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

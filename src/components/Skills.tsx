"use client";
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const skills = [
  {
    id: 1,
    name: "C",
    designation: "",
    image: "/skills/c.png",
  },
  {
    id: 2,
    name: "C++",
    designation: "",
    image: "/skills/cpp.png",
  },
  {
    id: 3,
    name: "Java",
    designation: "",
    image: "/skills/java.png",
  },
  {
    id: 4,
    name: "HTML",
    designation: "",
    image: "/skills/html.png",
  },
  {
    id: 5,
    name: "CSS",
    designation: "",
    image: "/skills/css.png",
  },
  {
    id: 6,
    name: "Tailwind CSS",
    designation: "",
    image: "/skills/tailwind.png",
  },
  {
    id: 7,
    name: "Javascript",
    designation: "",
    image: "/skills/js.png",
  },
  {
    id: 8,
    name: "React",
    designation: "",
    image: "/skills/react.png",
  },
  {
    id: 9,
    name: "Docker",
    designation: "",
    image: "/skills/docker.png",
  },
];

function Skills() {
  return (
    <div className="relative h-[40rem] overflow-hidden flex items-start justify-center md:mt-0">
      <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-start h-full mt-56 md:mt-40">
        <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
          Know my Skills
        </h2>
        <p className="text-base md:text-lg text-white text-center mb-4">
          Discover the skills I possess as an engineer
        </p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={skills} />
        </div>
      </WavyBackground>
    </div>
  );
}

export default Skills;

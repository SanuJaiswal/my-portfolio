"use client";
import Link from "next/link";
import projectData from "../data/projects.json";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { Button } from "./ui/moving-border";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  image: string;
}

function FeaturedProjects() {
  const featuredProjects = projectData.projects.filter(
    (project: Project) => project.isFeatured
  );

  return (
    <div className="py-12 bg-gray-900">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            FEATURED PROJECTS
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl">
            Showcasing My Best Work
          </p>
        </div>
      </div>
      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {featuredProjects.map((project: Project) => (
            <div key={project.id} className="flex justify-center">
              <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <Image
                    src={project.image}
                    alt={project.title}
                    height="400"
                    width="400"
                    className="object-contain"
                  />
                  <p className="text-lg sm:text-2xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {project.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                    {project.description}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-2 md:mt-4 text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 text-center">
        <Link href={"/projects"}>
          <Button
            borderRadius="1.75rem"
            className="text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            View All Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedProjects;

"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const experience = [
  {
    quote:
      "Developing and maintaining automated test scripts using Java and Selenium WebDriver within the TestNG framework for various clients. Collaborating with cross-functional teams to design the test plans, execute tests, analyze results and ensure high-quality delivery.",
    name: "Deloitte",
    title: "Associate",
    year: "07/2023 - Present",
  },
  {
    quote:
      "Designed and implemented an efficient Email Notification Service using Spring WebFlux to send targeted emails quickly and reliably via an API trigger. Integrated Kafka Consumer in the same microservice, to enable real-time listening and prompt delivery of requested emails.",
    name: "Philips",
    title: "SWE Intern",
    year: "01/2023 - 06/2023",
  },
  {
    quote:
      "Developing and maintaining automated test scripts using Java and Selenium WebDriver within the TestNG framework for various clients. Collaborating with cross-functional teams to design the test plans, execute tests, analyze results and ensure high-quality delivery.",
    name: "Deloitte",
    title: "Associate",
    year: "07/2023 - Present",
  },
  {
    quote:
      "Designed and implemented an efficient Email Notification Service using Spring WebFlux to send targeted emails quickly and reliably via an API trigger. Integrated Kafka Consumer in the same microservice, to enable real-time listening and prompt delivery of requested emails.",
    name: "Philips",
    title: "SWE Intern",
    year: "01/2023 - 06/2023",
  },
  {
    quote:
      "Developing and maintaining automated test scripts using Java and Selenium WebDriver within the TestNG framework for various clients. Collaborating with cross-functional teams to design the test plans, execute tests, analyze results and ensure high-quality delivery.",
    name: "Deloitte",
    title: "Associate",
    year: "07/2023 - Present",
  },
  {
    quote:
      "Designed and implemented an efficient Email Notification Service using Spring WebFlux to send targeted emails quickly and reliably via an API trigger. Integrated Kafka Consumer in the same microservice, to enable real-time listening and prompt delivery of requested emails.",
    name: "Philips",
    title: "SWE Intern",
    year: "01/2023 - 06/2023",
  },
];

function Experience() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 z-10">
        Work Experience
      </h2>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards
            items={experience}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
}

export default Experience;

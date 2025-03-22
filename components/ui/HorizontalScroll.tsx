"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Photo from "@/public/pattern1.jpg";
import { Button } from "./button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Cursor from "./Cursor";
import { Project } from "@/types/global";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "none", duration: 2 });

type HorizontalScrollProps = {
  items: Project[];
};

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverStates, setHoverStates] = useState<boolean[]>(
    items.map(() => false)
  );
  const isAnyHoverActive = hoverStates.some((hover) => hover);

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) =>
      prev.map((hover, i) => (i === index ? true : hover))
    );
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) =>
      prev.map((hover, i) => (i === index ? false : hover))
    );
  };

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>(".HorizontalSection")
        .forEach((element, i, array) => {
          const isLast = i === array.length - 1;
          ScrollTrigger.create({
            trigger: element,
            start: "top top",
            pin: !isLast,
            pinSpacing: false,
            scrub: true,
          });
        });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="container"
      className=" w-full min-h-screen  bg-background  overflow-hidden text-foreground"
    >
      {items.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="HorizontalSection  bg-white   text-start relative bg-no-repeat  text-black h-screen flex flex-col lg:flex-row "
        >
          <div className="flex z-10 max-md:flex-col  w-full   h-full justify-around p-1">
            <div className=" w-full gap-4  flex flex-col justify-between ">
              <div className="flex justify-between">
                <h2 className=" lg:text-3xl w-1/2 text-4xl">{item.title}</h2>
                <div className="text-3xl">2024&quot;</div>
              </div>

              <div className="space-x-2">
                <Link href={item.liveLink || ""}>
                  <Button variant="default">View Site</Button>
                </Link>
                <Link href={item.gitLink || ""}>
                  <Button variant="outline" className="text-primary">
                    GitHub
                    <GitHubLogoIcon />
                  </Button>
                </Link>
              </div>
              <Image
                src={Photo}
                alt=""
                width={500}
                height={500}
                className=" max-h-96 w-full object-cover p-1"
              />
            </div>

            <p className=" font-koverwatch  line-clamp-4 lg:text-2xl text-xl lg:max-w-md w-full p-1">
              {item.description}
            </p>
          </div>
        </div>
      ))}

      <Cursor isActive={isAnyHoverActive} />
    </div>
  );
};

export default HorizontalScroll;

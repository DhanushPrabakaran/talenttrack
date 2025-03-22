"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const HorizontalScroll = ({ name }: { name: string }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      gsap.to(scrollContainer, {
        xPercent: -30, // Move content to the left
        duration: 10, // Duration of the scroll animation
        ease: "none",
        repeat: -1, // Infinite repeat
        modifiers: {
          x: gsap.utils.unitize(
            (x) => parseFloat(x) % scrollContainer.offsetWidth
          ), // Wrap scrolling
        },
      });
    }
  }, []);

  return (
    <div className="absolute bottom-0">
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap text-[13vw] "
        // style={{ willChange: "transform" }}
      >
        <h1> {name} </h1>
        <h1> {name} </h1>
        <h1> {name} </h1>
        <h1> {name} </h1>
        <h1> {name} </h1>
      </div>
    </div>
  );
};

export default HorizontalScroll;

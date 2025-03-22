"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BlurryCursorProps {
  isActive?: boolean;
}

export default function BlurryCursor({ isActive = false }: BlurryCursorProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouseOuter = useRef({ x: 0, y: 0 });
  const delayedMouseInner = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const outerCircle = useRef<HTMLDivElement | null>(null);
  const innerCircle = useRef<HTMLDivElement | null>(null);

  const outerSize = isActive ? 100 : 10;
  const innerSize = isActive ? 100 : 0;

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.current = { x: clientX, y: clientY };
  };

  const moveCircle = (x: number, y: number, isInner: boolean) => {
    if (isInner && innerCircle.current) {
      gsap.set(innerCircle.current, { x, y, xPercent: -50, yPercent: -50 });
    } else if (!isInner && outerCircle.current) {
      gsap.set(outerCircle.current, { x, y, xPercent: -50, yPercent: -50 });
    }
  };

  useEffect(() => {
    const animate = () => {
      const { x: xOuter, y: yOuter } = delayedMouseOuter.current;
      const { x: xInner, y: yInner } = delayedMouseInner.current;

      delayedMouseOuter.current = {
        x: lerp(xOuter, mouse.current.x, 0.075),
        y: lerp(yOuter, mouse.current.y, 0.075),
      };

      delayedMouseInner.current = {
        x: lerp(xInner, mouse.current.x, 0.2),
        y: lerp(yInner, mouse.current.y, 0.2),
      };

      moveCircle(
        delayedMouseOuter.current.x,
        delayedMouseOuter.current.y,
        false
      );
      moveCircle(
        delayedMouseInner.current.x,
        delayedMouseInner.current.y,
        true
      );

      rafId.current = window.requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [isActive]);

  return (
    <div className="relative z-50">
      <div
        style={{
          width: outerSize,
          height: outerSize,
          transition: `height 0.3s ease-out, width 0.3s ease-out,  0.3s ease-out`,
        }}
        className="top-0  bg-foreground text-background overflow-hidden text-center flex justify-center align-middle items-center  left-0 fixed rounded-full  pointer-events-none "
        ref={outerCircle}
      >
        <div
          style={{
            width: innerSize,
            height: innerSize,
            transition: `height 0.3s ease-out, width 0.3s ease-out,  0.3s ease-out`,
          }}
          className="top-0  bg-background  filter backdrop-blur-sm text-foreground overflow-hidden text-center flex justify-center align-middle items-center  left-0 fixed rounded-full  pointer-events-none "
        >
          View
        </div>
      </div>
    </div>
  );
}

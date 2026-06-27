"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const revealCallbacks = new Map<Element, () => void>();
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const reveal = revealCallbacks.get(entry.target);
          revealObserver?.unobserve(entry.target);
          revealCallbacks.delete(entry.target);
          reveal?.();
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.05,
      },
    );
  }

  return revealObserver;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = getRevealObserver();

    if (!observer) {
      setIsVisible(true);
      return;
    }

    revealCallbacks.set(element, () => setIsVisible(true));
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      revealCallbacks.delete(element);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      data-direction={direction}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

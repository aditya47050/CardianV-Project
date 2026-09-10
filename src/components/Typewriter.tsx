"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export function Typewriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1500,
  className = "",
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isWaiting) {
          setIsWaiting(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, -1));
          if (currentText === "") {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
          }
        } else {
          const target = texts[index];
          if (currentText.length < target.length) {
            setCurrentText(target.slice(0, currentText.length + 1));
          } else {
            setIsWaiting(true);
          }
        }
      },
      isWaiting ? delayBetween : isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    index,
    isDeleting,
    isWaiting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetween,
  ]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse opacity-75 font-normal ml-1">|</span>
    </span>
  );
}

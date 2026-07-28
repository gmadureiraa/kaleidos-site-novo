"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * BlurWord — palavra rotativa com remontagem letra a letra (blur 12px → 0,
 * stagger 45ms/letra), padrão do teardown de referências (landing "compute").
 * Adaptação do espírito de `magicui/word-rotate` (que renderiza um <h1>
 * próprio e não pode viver DENTRO do h1 do hero): aqui é um <span> composto,
 * pra encaixar no highlight verde do headline sem duplicar h1.
 */
export function RotatingWord({
  words,
  duration = 2600,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      duration
    );
    return () => clearInterval(interval);
  }, [words, duration]);

  const word = words[index];

  return (
    <span
      className={className}
      style={{
        display: "inline-grid",
        verticalAlign: "bottom",
        whiteSpace: "nowrap",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          style={{ gridArea: "1 / 1", display: "inline-block" }}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.045 } },
            exit: { opacity: 0, transition: { duration: 0.18 } },
          }}
        >
          {word.split("").map((letter, i) => (
            <motion.span
              key={`${word}-${i}`}
              style={{ display: "inline-block" }}
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 8 },
                show: {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: { duration: 0.38, ease: "easeOut" },
                },
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

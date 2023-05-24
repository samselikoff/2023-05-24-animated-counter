"use client";

import {
  MotionValue,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  let [count, setCount] = useState(0);

  return (
    <div className="flex p-20">
      <div className="w-1/2">
        <p>Count: {count}</p>
        <div className="mt-8">
          <Counter value={count} />
        </div>
      </div>
      <div className="w-1/2">
        <input
          type="range"
          value={count}
          min={0}
          max={20}
          onChange={(e) => setCount(+e.target.value)}
          name=""
          id=""
        />
      </div>
    </div>
  );
}

function Counter({ value }: { value: number }) {
  let animatedValue = useMotionValue(value);

  useEffect(() => {
    animate(animatedValue, value, { ease: "linear", duration: 0.5 });
    // animate(animatedValue, value, { type: "spring", duration: 1.5 });
  }, [animatedValue, value]);

  return (
    <div className="relative h-6 w-6 ring-2 ring-red-500">
      {[...Array(10).keys()].map((digit) => (
        <Digit mv={animatedValue} key={digit} digit={digit} />
      ))}
    </div>
  );
}

let array = [0, -24, -48, -72, -96, -120, 96, 72, 48, 24];

function Digit({ mv, digit }: { mv: MotionValue; digit: number }) {
  // let y = useTransform(mv, (v) => ((v * -24) % 216) + digit * 24);
  let y = useTransform(mv, (v) => {
    let height = 24;
    let lastDigitOfMv = v % 10;
    // WORKS
    let x1 = (lastDigitOfMv + 10 - digit) % 10;
    let x2 = -height;
    let f1 = x1 * x2;
    let x3 = x1 > 5 ? 10 * height : 0;
    let f2 = f1 + x3;

    return f2;
  });

  return (
    <motion.div
      style={{ y }}
      transition={{ ease: "linear", duration: 2 }}
      className="absolute inset-0 flex justify-center"
    >
      <span>{digit}</span>
    </motion.div>
  );
}

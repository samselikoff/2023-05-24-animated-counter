"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  let [count, setCount] = useState(0);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-1/2 justify-center">
        <div className="flex-col text-center">
          <p>Count: {count}</p>
          <div className="mt-4">
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(+e.target.value)}
              className="w-20 p-1"
            />
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-end justify-center">
        <Counter value={count} />
      </div>
    </div>
  );
}

function Counter({ value }: { value: number }) {
  let animatedValue = useSpring(value);
  let newAnimatedValue = useTransform(animatedValue, (v) => v / 10);

  useEffect(() => {
    animatedValue.set(value);
  }, [animatedValue, value]);

  return (
    <div className="flex h-6 w-12 overflow-hidden ring-2 ring-red-500">
      <div className="relative w-6">
        {[...Array(10).keys()].map((digit) => (
          <Digit mv={newAnimatedValue} key={digit} digit={digit} />
        ))}
      </div>
      <div className="relative w-6">
        {[...Array(10).keys()].map((digit) => (
          <Digit mv={animatedValue} key={digit} digit={digit} />
        ))}
      </div>
    </div>
  );
}

function Digit({ mv, digit }: { mv: MotionValue; digit: number }) {
  let y = useTransform(mv, (v) => {
    let height = 24;
    let lastDigitOfMv = v % 10;

    let offset = (lastDigitOfMv + 10 - digit) % 10;
    let y = -offset * height;

    if (offset > 5) {
      y += 10 * height;
    }

    return y;
  });

  return (
    <motion.div style={{ y }} className="absolute inset-0 flex justify-center">
      <span>{digit}</span>
    </motion.div>
  );
}

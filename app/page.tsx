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
        <div className="flex-col">
          <button onClick={() => setCount(0)} className="block w-full border">
            Set to 0
          </button>
          <button onClick={() => setCount(1)} className="block w-full border">
            Set to 1
          </button>
          <button onClick={() => setCount(10)} className="block w-full border">
            Set to 10
          </button>
          <button onClick={() => setCount(20)} className="block w-full border">
            Set to 20
          </button>
          <button onClick={() => setCount(25)} className="block w-full border">
            Set to 25
          </button>
          <button onClick={() => setCount(50)} className="block w-full border">
            Set to 50
          </button>
          <button onClick={() => setCount(99)} className="block w-full border">
            Set to 99
          </button>
          <button
            onClick={() => setCount(1000)}
            className="block w-full border"
          >
            Set to 1000
          </button>
        </div>
        {/* <input
          type="range"
          value={count}
          min={0}
          max={20}
          onChange={(e) => setCount(+e.target.value)}
          name=""
          id=""
        /> */}
      </div>
    </div>
  );
}

function Counter({ value }: { value: number }) {
  let animatedValue = useMotionValue(value);
  let newAnimatedValue = useTransform(animatedValue, (v) => v / 10);

  useEffect(() => {
    // animate(animatedValue, value, { ease: "linear", duration: 5 });
    animate(animatedValue, value, {
      type: "spring",
      bounce: 0,
      duration: 1.5,
    });
  }, [animatedValue, value]);

  return (
    <div className="flex h-6 w-12 overflow-hidden ring-2 ring-red-500">
      <div className="relative w-1/2">
        {[...Array(10).keys()].map((digit) => (
          <Digit mv={newAnimatedValue} key={digit} digit={digit} />
        ))}
      </div>
      <div className="relative w-1/2">
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
    <motion.div
      style={{ y }}
      transition={{ ease: "linear", duration: 2 }}
      className="absolute inset-0 flex justify-center"
    >
      <span>{digit}</span>
    </motion.div>
  );
}

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

  useEffect(() => {
    animatedValue.set(value);
  }, [animatedValue, value]);

  return (
    <div className="flex h-6 ring-2 ring-red-500">
      <div className="relative w-6">
        <Digit place={100} animatedValue={animatedValue} />
      </div>
      <div className="relative w-6">
        <Digit place={10} animatedValue={animatedValue} />
      </div>
      <div className="relative w-6">
        <Digit place={1} animatedValue={animatedValue} />
      </div>
    </div>
  );
}

function Digit({
  animatedValue,
  place,
}: {
  animatedValue: MotionValue;
  place: number;
}) {
  let mv = useTransform(animatedValue, (v) => v / place);

  return (
    <>
      {[...Array(10).keys()].map((number) => (
        <Number mv={mv} key={number} number={number} />
      ))}
    </>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (v) => {
    let height = 24;
    let lastDigitOfMv = v % 10;

    let offset = (lastDigitOfMv + 10 - number) % 10;
    let y = -offset * height;

    if (offset > 5) {
      y += 10 * height;
    }

    return y;
  });

  return (
    <motion.div style={{ y }} className="absolute inset-0 flex justify-center">
      <span>{number}</span>
    </motion.div>
  );
}

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
      <div className="relative w-6">1</div>
    </div>
  );
}

function Digit() {
  return <div className="absolute inset-0 flex justify-center">1</div>;
}

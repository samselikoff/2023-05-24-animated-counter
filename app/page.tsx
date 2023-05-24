"use client";

import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  let [count, setCount] = useState(0);

  return (
    <div className="p-20">
      <div className="flex space-x-8">
        <button onClick={() => setCount(0)}>Set to 0</button>
        <button onClick={() => setCount(9)}>Set to 9</button>
      </div>

      <div className="mt-8">
        <p>Count: {count}</p>
      </div>
      <div className="mt-8">
        <Counter value={count} />
      </div>
    </div>
  );
}

function Counter({ value }: { value: number }) {
  let animatedValue = useMotionValue(value);
  let ref = useRef<HTMLParagraphElement>(null);

  // useEffect(() => {
  // }, [animatedValue, value]);

  useEffect(() => {
    // initial
    if (ref.current) {
      ref.current.textContent = animatedValue.get().toString();
    }

    animate(animatedValue, value, {
      // type: "tween",
      // ease: "easeInOut",
      ease: "linear",
      duration: 1,
    });

    return animatedValue.on("change", (current) => {
      if (ref.current) {
        console.log(current);
        console.log(Math.floor(current).toString());

        ref.current.textContent = Math.floor(current).toString();
      }
    });
  }, [animatedValue, value]);

  return <p className="text-3xl tabular-nums" ref={ref} />;
}

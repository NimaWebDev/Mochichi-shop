"use client";
import { useState } from "react";

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
}

export default function Counter({ value, onChange }: CounterProps) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(1, value - 1));

  return (
    <div className="mr-25 md:mr-0 flex items-center gap-4">
      <button
        onClick={decrement}
        className="w-10 h-10 flex items-center justify-center bg-[#F6F6F6] rounded-4xl cursor-pointer"
      >
        <span className="text-xl">-</span>
      </button>

      <span className="text-xl font-medium w-8 text-center">
        {value}
      </span>

      <button
        onClick={increment}
        className="w-10 h-10 flex items-center justify-center bg-[#F6F6F6] rounded-4xl cursor-pointer"
      >
        <span className="text-xl">+</span>
      </button>
    </div>
  );
}

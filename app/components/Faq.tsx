"use client";

import { useState } from "react";
import BoldSilencie from "./BoldSilencie";

export type FaqItem = {
  question: string;
  answer: string;
};

function FAQEntry({
  question,
  answer,
  isLast = false,
}: {
  question: string;
  answer: string;
  isLast?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isLast ? "" : "border-b border-white/20"}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-medium text-white">
          <BoldSilencie>{question}</BoldSilencie>
        </span>
        <span className="ml-4 text-2xl text-white">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-white/90 leading-relaxed">
          <BoldSilencie>{answer}</BoldSilencie>
        </p>
      </div>
    </div>
  );
}

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((faq, index) => (
        <FAQEntry
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export type Testimonial = {
  name: string;
  photo: string;
  text: string;
};

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative">
      {testimonials.length > 1 && (
        <>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full border border-green/20 flex items-center justify-center text-green hover:bg-green/5 transition-colors bg-white z-10"
            aria-label="Depoimento anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full border border-green/20 flex items-center justify-center text-green hover:bg-green/5 transition-colors bg-white z-10"
            aria-label="Próximo depoimento"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      <div className="grid gap-12 md:grid-cols-[200px_1fr] md:items-center min-h-[400px] md:min-h-[280px]">
        <div className="relative aspect-square rounded-full overflow-hidden mx-auto md:mx-0 w-48 md:w-full bg-green/10">
          {current.photo ? (
            <Image
              src={current.photo}
              alt={current.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-green/40">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <blockquote className="text-lg leading-relaxed text-green/90 mb-6">
            &ldquo;{current.text}&rdquo;
          </blockquote>
          <p className="font-medium text-green">{current.name}</p>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-green" : "bg-green/20"
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

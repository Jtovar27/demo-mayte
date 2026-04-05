"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";

const REVIEWS = [
  { text: "reviews.r1.text", name: "reviews.r1.name", service: "reviews.r1.service" },
  { text: "reviews.r2.text", name: "reviews.r2.name", service: "reviews.r2.service" },
  { text: "reviews.r3.text", name: "reviews.r3.name", service: "reviews.r3.service" },
];

const AUTO_DELAY = 4000;

export default function ReviewCarousel() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = REVIEWS.length;

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(active + 1), AUTO_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, goTo]);

  // Touch / drag
  function onDragStart(x: number) { setDragging(true); dragStart.current = x; }
  function onDragEnd(x: number) {
    if (!dragging) return;
    setDragging(false);
    const delta = dragStart.current - x;
    if (Math.abs(delta) > 40) goTo(active + (delta > 0 ? 1 : -1));
  }

  return (
    <div className="relative select-none">
      {/* Track */}
      <div
        className="overflow-hidden"
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onMouseLeave={(e) => { if (dragging) onDragEnd(e.clientX); }}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${active * 100}% - ${active * 0}px))` }}
        >
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full px-2 md:px-4"
              style={{ width: "100%" }}
            >
              {/* Desktop: show 3 as reel — use CSS grid trick with peek */}
              <div
                className="rounded-2xl border p-6 md:p-8 flex flex-col gap-4 mx-auto transition-all duration-500"
                style={{
                  borderColor: "#E4E4E4",
                  backgroundColor: "#FAFAFA",
                  maxWidth: "560px",
                  boxShadow: "0 4px 24px rgba(13,43,78,0.08)",
                }}
              >
                <div className="flex items-center gap-1" style={{ color: "#B9954F", fontSize: "18px" }}>
                  {"★★★★★"}
                </div>
                <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: "#0D2B4E" }}>
                  &ldquo;{t(r.text)}&rdquo;
                </p>
                <div className="border-t pt-4" style={{ borderColor: "#EBEBEB" }}>
                  <p className="text-sm font-semibold" style={{ color: "#0D2B4E" }}>{t(r.name)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#B9954F" }}>{t(r.service)}</p>
                  <p className="text-xs mt-1" style={{ color: "#AFAFAF" }}>{t("reviews.verified")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo(active - 1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 md:-translate-x-5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#0D2B4E", color: "#B9954F" }}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={() => goTo(active + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 md:translate-x-5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#0D2B4E", color: "#B9954F" }}
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              backgroundColor: i === active ? "#B9954F" : "#D0D0D0",
            }}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

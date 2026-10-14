"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export default function ExpandableStepImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto block w-full max-w-sm cursor-pointer rounded-2xl lg:max-w-none"
        aria-label={`عرض الصورة بحجم أكبر: ${alt}`}
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          sizes="(min-width: 1024px) 280px, 100vw"
          className="h-auto w-full rounded-2xl"
        />
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-blue/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <p id={titleId} className="sr-only">
            {alt}
          </p>
          <button
            ref={closeRef}
            type="button"
            className="absolute end-4 top-4 rounded-full bg-off-white px-4 py-2 text-sm font-bold text-midnight-blue"
            onClick={() => setOpen(false)}
          >
            إغلاق
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className="h-auto max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

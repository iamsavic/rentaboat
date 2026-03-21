"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface TourGalleryProps {
  images: string[];
  tourName: string;
}

export default function TourGallery({ images, tourName }: TourGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const allImages = images.length > 0 ? images : ["/images/tour-placeholder.jpg"];

  const prev = () => setCurrent((c) => (c === 0 ? allImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === allImages.length - 1 ? 0 : c + 1));

  return (
    <>
      <div className="relative">
        {/* Main image */}
        <div
          className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-200 overflow-hidden cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            <span className="text-white/60">No image yet</span>
          </div>

          {allImages[current] && allImages[current] !== "/images/tour-placeholder.jpg" && (
            <Image
              src={allImages[current]}
              alt={`${tourName} - ${current + 1}`}
              fill
              className="object-cover"
              priority
            />
          )}

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === current ? "border-sky-500" : "border-transparent"
                }`}
              >
                <div className="absolute inset-0 bg-slate-200" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2"
            onClick={() => setLightbox(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video mx-4">
            <div className="absolute inset-0 flex items-center justify-center text-white/30">
              {tourName}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

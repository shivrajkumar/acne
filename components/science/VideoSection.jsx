import React from "react";
import Image from "next/image";
import { CDN_BASE_URL } from "@/constants/constants";

export default function VideoSection({ data }) {
  const title = data?.title || "Don't take ACNE at face value.";
  const videoUrl = data?.video_url;
  const posterImage = data?.poster?.data?.attributes?.url;
  const backgroundImage = data?.background?.data?.attributes?.url;

  return (
    <section className="relative bg-[#1A1A1A] px-4 md:px-10 lg:px-20 py-12 md:py-20 overflow-hidden">
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={`${CDN_BASE_URL}${backgroundImage}`}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        {/* Video Container */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          {videoUrl ? (
            <video
              className="w-full h-full object-cover"
              controls
              poster={posterImage ? `${CDN_BASE_URL}${posterImage}` : undefined}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : posterImage ? (
            <div className="relative w-full h-full group cursor-pointer">
              <Image
                src={`${CDN_BASE_URL}${posterImage}`}
                alt={title}
                fill
                className="object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all duration-200">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-10 h-10 text-[#1A1A1A] ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] flex items-center justify-center">
              <div className="text-center text-white space-y-4 p-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
              </div>
            </div>
          )}

          {/* Title Overlay */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {title}
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

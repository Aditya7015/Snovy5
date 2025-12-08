import React from "react";

export default function HomeShimmer() {
  return (
    <div className="relative animate-pulse">

      {/* CENTER LOADING SPINNER */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]">
        <TenDotLoader />
      </div>

      {/* HEADER */}
      {/* <div className="h-20 w-full bg-gray-200" /> */}

      {/* HERO SECTION */}
      {/* <div className="relative h-[80vh] w-full bg-gray-300">
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-gray-400" />
          ))}
        </div>
      </div> */}

      {/* FEATURED COLLECTION SHIMMER */}
      <div className="container-custom py-16">
        <div className="h-8 w-60 bg-gray-300 rounded-md mb-10" />

        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardShimmer key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="h-12 w-40 bg-gray-300 rounded-xl" />
        </div>
      </div>

      {/* NEW COLLECTION SHIMMER */}
      <div className="container-custom py-16">
        <div className="h-8 w-60 bg-gray-300 rounded-md mb-10" />

        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardShimmer key={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="h-12 w-52 bg-gray-300 rounded-xl" />
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-300 h-48 w-full" />
    </div>
  );
}

/* ---------------- PRODUCT CARD SHIMMER ---------------- */
function ProductCardShimmer() {
  return (
    <div className="min-w-[240px] border border-gray-200 rounded-xl p-3">
      <div className="w-full h-52 bg-gray-300 rounded-lg" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
      <div className="mt-4">
        <div className="h-10 w-full bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
}

/* ---------------- 10 DOT SPINNER ---------------- */
function TenDotLoader() {
  return (
    <div className="relative w-20 h-20">
      {[...Array(10)].map((_, i) => {
        const angle = (i * 36) * (Math.PI / 180); // 360 / 10
        const x = Math.cos(angle) * 32;
        const y = Math.sin(angle) * 32;

        return (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gray-600 rounded-full animate-bounce"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        );
      })}
    </div>
  );
}

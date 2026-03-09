import { useState } from "react";

export default function FlippableCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${flipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0 rotatbackface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

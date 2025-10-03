import React from "react";
import PixelBlast from "./PixelBlast";

/**
 * Pixel Blast Background Component
 * Using the reactbits.dev PixelBlast component with Three.js
 */
export const BackgroundBeams = React.memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
      <PixelBlast
        variant="circle"
        pixelSize={5}
        color="#ffffff40"
        patternScale={1}
        patternDensity={0.15}
        pixelSizeJitter={0.1}
        enableRipples={true}
        speed={0.2}
        edgeFade={0.3}
        transparent={false}
      />
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";

export default BackgroundBeams;

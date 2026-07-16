"use client";

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export default function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  return (
    <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-md border border-gold-500/10 bg-gold-500/[0.01]">
      {/* Inline styles for extremely smooth, staggered concentric ripples */}
      <style>{`
        @keyframes goldRipple {
          0% {
            transform: scale(0.3);
            opacity: 0.9;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
            box-shadow: 0 0 40px rgba(212, 175, 55, 0);
          }
        }
        .gold-ring-ripple {
          animation: goldRipple 3.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }
      `}</style>

      {/* Decorative Central Golden Medallion */}
      <div className="absolute h-10 w-10 rounded-full border-2 border-gold-500 bg-[#0c0c10] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
        {/* Antique cross/crown pattern inside medallion */}
        <div className="relative h-6 w-6 rounded-full border border-gold-500/30 flex items-center justify-center">
          <div className="absolute h-3 w-[1px] bg-gold-400" />
          <div className="absolute w-3 h-[1px] bg-gold-400" />
          <div className="h-1 w-1 rounded-full bg-gold-300 animate-pulse" />
        </div>
      </div>

      {/* Ripple concentric waves */}
      {isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="gold-ring-ripple absolute h-24 w-24 rounded-full border border-gold-500/50" style={{ animationDelay: "0s" }} />
          <div className="gold-ring-ripple absolute h-24 w-24 rounded-full border border-gold-500/40" style={{ animationDelay: "0.87s" }} />
          <div className="gold-ring-ripple absolute h-24 w-24 rounded-full border border-gold-500/35" style={{ animationDelay: "1.75s" }} />
          <div className="gold-ring-ripple absolute h-24 w-24 rounded-full border border-gold-400/20" style={{ animationDelay: "2.62s" }} />
        </div>
      ) : (
        /* Majestic static orbits when audio is idle/paused */
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="absolute h-14 w-14 rounded-full border border-gold-500/30" />
          <div className="absolute h-28 w-28 rounded-full border border-gold-500/20" />
          <div className="absolute h-44 w-44 rounded-full border border-gold-500/10" />
          <div className="absolute h-60 w-60 rounded-full border border-gold-500/5" />
        </div>
      )}
    </div>
  );
}

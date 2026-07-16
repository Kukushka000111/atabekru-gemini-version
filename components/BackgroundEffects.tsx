export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep Marble Base */}
      <div className="absolute inset-0 bg-[#050507]" />
      
      {/* Antique Architectural Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Soft warm light beam/candle-glow falling from top-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 15%, rgba(212, 175, 55, 0.07) 0%, rgba(5, 5, 7, 0) 70%)",
        }}
      />

      {/* Atmospheric center focus glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 50vw at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 80%)",
        }}
      />
    </div>
  );
}

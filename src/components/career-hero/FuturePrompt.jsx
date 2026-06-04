// Closing beat. After WEM settles, the 4th "chapter" — what's next — fades up.
// One question, one address. No marketing.

export function FuturePrompt({ progress }) {
  if (progress < 0.90) return null;
  const o = Math.min(1, (progress - 0.90) / 0.08);   // 0 at 0.90, 1 at 0.98+

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
      style={{ opacity: o }}
      aria-hidden={o < 0.1}
    >
      <div className="font-mono text-[10px] tracking-[0.32em] text-[#4ECDC4] mb-6">
        CHAPTER 4 · TBD
      </div>
      <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
        What's next?
      </h2>
      <p className="text-white/65 text-base md:text-lg max-w-lg mb-8">
        Honestly not sure yet. Email me if you've got something interesting.
      </p>
      <a
        href="mailto:elad.ser@gmail.com"
        className="text-[#4ECDC4] text-lg md:text-xl font-mono tracking-wider underline decoration-[#4ECDC4]/40 underline-offset-8 hover:decoration-[#4ECDC4] pointer-events-auto transition-colors"
      >
        elad.ser@gmail.com
      </a>
    </div>
  );
}

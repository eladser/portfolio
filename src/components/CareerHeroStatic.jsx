// Mobile + reduced-motion fallback for CareerHero3D. No canvas, no GSAP, just the
// three chapters as text. Keeps the narrative intact without the 931 kB of 3D stack.

import { CAREER } from '../data/career';

export function CareerHeroStatic() {
  return (
    <section
      className="relative w-full bg-[#0a0a0a] overflow-hidden"
      style={{ minHeight: '100dvh' }}
      aria-label="Three career chapters: defense, semiconductor, energy"
    >
      <div className="px-6 py-16 max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[10px] tracking-[0.32em] text-[#4ECDC4] mb-4">
            BACKEND / FULL-STACK ENGINEER · HAIFA, IL
          </div>
          <h1 className="text-white text-4xl font-bold tracking-tight leading-[1.05] mb-5">
            Elad Sertshuk
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Backend C# for about ten years now. Three jobs so far:
            {' '}<span className="text-[#4ECDC4]/90">Elbit</span>,
            {' '}<span className="text-[#4ECDC4]/90">KLA</span>,
            {' '}and now <span className="text-[#4ECDC4]/90">WEM</span> on
            grid-scale energy.
          </p>
        </div>

        <div className="space-y-8">
          {CAREER.map((chap, i) => (
            <div key={chap.id} className="border-l border-[#4ECDC4]/30 pl-5">
              <div className="font-mono text-[10px] tracking-[0.32em] text-[#4ECDC4] mb-2">
                CHAPTER {String(i + 1).padStart(2, '0')}
              </div>
              <h2 className="text-white text-2xl font-bold tracking-tight mb-1">{chap.org}</h2>
              <div className="text-white/65 text-sm mb-1">{chap.years} · {chap.role}</div>
              <div className="text-white/45 text-xs italic mb-3">{chap.detail}</div>
              <div className="flex flex-wrap gap-1.5">
                {chap.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.10] text-white/70 text-xs font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

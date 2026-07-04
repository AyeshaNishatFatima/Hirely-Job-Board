import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { stats } from '@/data/stats';

export default function Stats() {
  return (
    <section className="border-y border-ink/5 bg-white/60 dark:border-white/5 dark:bg-surface-dark/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <StatItem key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic for a snappy finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-bold tracking-tight text-signal-600 dark:text-signal-300 sm:text-4xl">
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{label}</p>
    </div>
  );
}

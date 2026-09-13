import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  GraduationCap,
  BookOpenCheck,
  Award,
  Building2,
  Handshake,
  Star,
} from "lucide-react";
import { statsData } from "../../data/statsData";

interface CounterProps {
  value: number;
  suffix: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, suffix }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // ms
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = value / steps;
    const isDecimal = value % 1 !== 0;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(
          isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start),
        );
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

export const AnimatedStats: React.FC = () => {
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-indigo-500" />;
      case "BookOpenCheck":
        return <BookOpenCheck className="w-6 h-6 text-cyan-500" />;
      case "Award":
        return <Award className="w-6 h-6 text-violet-500" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-emerald-500" />;
      case "Handshake":
        return <Handshake className="w-6 h-6 text-blue-500" />;
      case "Star":
        return <Star className="w-6 h-6 text-amber-500" />;
      default:
        return <Award className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Frosted Glass Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3 backdrop-blur-sm shadow-xs">
            Excellence In Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Transforming Careers Across The UK & Worldwide
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Our numbers reflect our commitment to academic rigor, student
            satisfaction, and real-world employment outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl text-center hover:border-indigo-500/60 hover:bg-white/10 transition-all group shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-3.5 group-hover:scale-110 transition-transform">
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-1 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="text-xs font-bold text-slate-200 mb-1">
                {stat.label}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

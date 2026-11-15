import {ArrowDownRight, RefreshCw} from 'lucide-react';
import {motion} from 'motion/react';
import {useState} from 'react';
import heroStudyImage from '../assets/images/hero_dark_study_1794763095539.jpg';
import {PROFILE} from '../data/portfolio';
import type {VisitorCountResult} from '../services/api';

interface HeroSectionProps {
  onNavigateContact: () => void;
  visitorState: VisitorCountResult;
  visitorLoading: boolean;
  onRefreshVisitors: () => void;
}

export function HeroSection({
  onNavigateContact,
  visitorState,
  visitorLoading,
  onRefreshVisitors,
}: HeroSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-violet-600/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-lime-400/8 blur-[110px]"
      />

      <div className="mx-auto max-w-[1200px] px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <p className="text-sm font-medium text-zinc-400">
                <span className="text-violet-300">{PROFILE.roleSummary}</span>
                <span aria-hidden="true" className="mx-2.5 text-zinc-600">
                  ·
                </span>
                <span>Bengaluru</span>
              </p>

              <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-[1.06] tracking-tight text-zinc-50">
                {PROFILE.name}
              </h1>

              <p className="mt-5 max-w-xl font-display text-xl font-medium leading-snug text-lime-300 sm:text-2xl">
                {PROFILE.headline}
              </p>

              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-zinc-300 sm:text-[17px]">
                {PROFILE.heroDescription}
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#about"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-lime-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-lime-300 whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onNavigateContact}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#0e0e13] px-6 py-3 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-violet-400/60 hover:bg-violet-500/10 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12] sm:min-h-[340px]">
              {!imageFailed ? (
                <img
                  src={heroStudyImage}
                  alt="Minimalist dark developer workstation illuminated by subtle violet and lime rim light"
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover object-center lg:h-full"
                />
              ) : (
                <div className="flex h-full min-h-[280px] w-full flex-col justify-end bg-gradient-to-br from-[#13111c] via-[#0b0b10] to-[#0a120a] p-6">
                  <p className="text-sm font-medium text-zinc-300">{PROFILE.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{PROFILE.headline}</p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060608]/60 via-transparent to-transparent"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-zinc-500">Academic Track</p>
            <p className="mt-1.5 text-sm font-medium text-zinc-100">Bachelor of Technology</p>
          </div>

          <div>
            <p className="text-xs font-medium text-zinc-500">Core Interest</p>
            <p className="mt-1.5 text-sm font-medium text-zinc-100">
              Programming · Problem Solving · Software Development
            </p>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-500">Portfolio Visitors (Flask API)</p>
              <div className="mt-1.5 flex items-center gap-2 text-sm font-medium text-zinc-100">
                {visitorLoading ? (
                  <span className="text-zinc-400">Checking visitor count…</span>
                ) : visitorState.status === 'connected' && visitorState.count !== null ? (
                  <span className="font-mono tabular-nums text-lime-300">
                    {visitorState.count.toLocaleString()} recorded visits
                  </span>
                ) : visitorState.status === 'unconfigured' ? (
                  <span className="text-zinc-400">Awaiting Flask API connection</span>
                ) : (
                  <span className="text-zinc-400">Flask service offline</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onRefreshVisitors}
              disabled={visitorLoading}
              aria-label="Refresh visitor count from Python Flask backend"
              title="Refresh visitor count"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0e0e13] text-zinc-400 transition-colors duration-150 hover:border-violet-400/50 hover:text-zinc-100 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw
                className={`h-4 w-4 ${visitorLoading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

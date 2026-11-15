import {GraduationCap} from 'lucide-react';
import {motion} from 'motion/react';
import {PROFILE} from '../data/portfolio';

export function EducationSection() {
  const {institution, degree, status, focusNote} = PROFILE.education;

  return (
    <section id="education" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-violet-300">Education</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50">
              Academic Foundation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Building core engineering discipline through formal undergraduate study and consistent self-directed practice.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#0b0b10] p-7 sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#12121a] text-lime-300">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-zinc-50 sm:text-2xl">
                      {institution}
                    </h3>
                    <p className="mt-1 text-base text-zinc-300">{degree}</p>
                  </div>
                </div>

                <p className="text-sm font-medium text-lime-300">{status}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-zinc-500">Institution</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">{institution}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Degree Program</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">{degree}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500">Current Status</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">{status}</p>
                </div>
              </div>

              <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-zinc-400">
                {focusNote}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

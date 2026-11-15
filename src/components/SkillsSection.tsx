import {motion} from 'motion/react';
import {useState} from 'react';
import {LEARNING_AREAS, LEARNING_CATEGORIES, type LearningCategory} from '../data/portfolio';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<LearningCategory>('All');

  const visibleAreas =
    activeCategory === 'All'
      ? LEARNING_AREAS
      : LEARNING_AREAS.filter((area) => area.category === activeCategory);

  return (
    <section id="skills" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-violet-300">Skills &amp; Learning Areas</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Core Areas of Study
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Foundational languages, web technologies, and computer science concepts I am actively studying and applying.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter learning areas by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0b0b10] p-1 self-start lg:self-auto"
          >
            {LEARNING_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-lime-400 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleAreas.map((area, idx) => (
            <motion.article
              key={area.id}
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.15}}
              transition={{
                duration: 0.32,
                delay: idx * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0b10] p-6 transition-colors duration-150 hover:border-violet-400/45"
            >
              <div>
                <p className="text-xs font-medium text-zinc-500 transition-colors duration-150 group-hover:text-violet-300">
                  {area.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-zinc-100 transition-colors duration-150 group-hover:text-lime-300">
                  {area.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{area.focus}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

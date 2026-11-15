import {motion} from 'motion/react';
import {useState} from 'react';
import prismImage from '../assets/images/about_prism_geometry_1794763095381.jpg';
import {PROFILE} from '../data/portfolio';

const FOCUS_PRINCIPLES = [
  {
    index: '01.',
    title: 'First-Principles Programming',
    description:
      'Understanding how logic, memory, and control flow behave beneath abstractions using Python and C.',
  },
  {
    index: '02.',
    title: 'Structured Problem Solving',
    description:
      'Practicing algorithmic reasoning and data structures to turn ambiguous problems into reliable steps.',
  },
  {
    index: '03.',
    title: 'Modern Software Craft',
    description:
      'Connecting clean semantic frontends with dedicated backend APIs through version-controlled workflows.',
  },
] as const;

export function AboutSection() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="about" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]">
              {!imageFailed ? (
                <img
                  src={prismImage}
                  alt="Precision metal instruments and an optical prism refracting subtle violet and lime light on a matte black surface"
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="aspect-[3/4] w-full object-cover object-center"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full flex-col justify-end bg-gradient-to-br from-[#14111f] via-[#0b0b0f] to-[#0c140c] p-8">
                  <p className="font-display text-lg font-semibold text-zinc-100">
                    {PROFILE.name}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{PROFILE.roleSummary}</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <p className="text-sm font-medium text-violet-300">About Me</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Driven by curiosity, grounded in fundamentals.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300">
              {PROFILE.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {FOCUS_PRINCIPLES.map((item) => (
                <div key={item.index} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6">
                  <div className="sm:col-span-5">
                    <h3 className="font-display text-base font-semibold text-zinc-100">
                      <span className="mr-2 font-mono text-sm font-normal text-lime-300">
                        {item.index}
                      </span>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400 sm:col-span-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

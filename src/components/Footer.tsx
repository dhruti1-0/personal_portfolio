import {PROFILE} from '../data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050507] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-semibold text-zinc-100">{PROFILE.name}</p>
          <p className="mt-1 text-xs text-zinc-500">
            Bachelor of Technology · {PROFILE.education.institution}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
          <a href="#home" className="transition-colors duration-150 hover:text-zinc-100">
            Home
          </a>
          <a href="#about" className="transition-colors duration-150 hover:text-zinc-100">
            About
          </a>
          <a href="#education" className="transition-colors duration-150 hover:text-zinc-100">
            Education
          </a>
          <a href="#skills" className="transition-colors duration-150 hover:text-zinc-100">
            Skills
          </a>
          <a href="#contact" className="transition-colors duration-150 hover:text-zinc-100">
            Contact
          </a>
        </nav>

        <p className="text-xs text-zinc-500 tabular-nums">© {year} {PROFILE.name}</p>
      </div>
    </footer>
  );
}

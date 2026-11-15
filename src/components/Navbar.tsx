import {Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';

interface NavbarProps {
  onNavigateContact: () => void;
}

const NAV_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Education', href: '#education'},
  {label: 'Skills', href: '#skills'},
] as const;

export function Navbar({onNavigateContact}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handleContactAction = () => {
    setMobileOpen(false);
    onNavigateContact();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060608]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6">
        <a
          href="#home"
          className="font-display text-base font-semibold tracking-tight text-zinc-100 transition-colors duration-150 hover:text-lime-300 whitespace-nowrap shrink-0 sm:text-lg"
        >
          Dhruti Deepan Pradhan
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 transition-colors duration-150 hover:text-zinc-100 whitespace-nowrap shrink-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-lime-400 after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleContactAction}
            className="hidden md:inline-flex min-h-[40px] items-center justify-center rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-lime-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contact Me
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#0e0e13] text-zinc-200 transition-colors duration-150 hover:border-violet-400/50 hover:text-white md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-white/10 bg-[#0a0a0f] px-6 py-5 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center text-base font-medium text-zinc-300 transition-colors duration-150 hover:text-lime-300"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleContactAction}
              className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-lime-300 cursor-pointer"
            >
              Contact Me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

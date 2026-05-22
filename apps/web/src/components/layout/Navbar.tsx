import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExperienceModeSwitch } from '@/components/experience/ExperienceModeSwitch';
import { Button } from '@/components/ui/Button';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { NAV_ITEMS, SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';

const SPY_SECTIONS = [
  SECTION_IDS.HERO,
  SECTION_IDS.ABOUT,
  SECTION_IDS.WORKFLOWS,
  SECTION_IDS.SKILLS,
  SECTION_IDS.PROJECTS,
  SECTION_IDS.EXPERIENCE,
  SECTION_IDS.GITHUB,
  SECTION_IDS.CONTACT,
];

export function Navbar(): React.JSX.Element {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(SPY_SECTIONS);

  const handleNavClick = (): void => {
    setIsMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 right-0 left-0 z-50"
    >
      <nav
        className="mx-auto mt-4 flex max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <div className="glass flex w-full items-center justify-between rounded-full px-4 py-3 shadow-sm">
          <Link
            to="/"
            className="rounded-full bg-gradient-to-r from-pink-500/15 via-fuchsia-400/10 to-violet-400/15 px-3 py-1 font-mono text-sm font-semibold tracking-tight text-foreground"
            aria-label="Home"
          >
            AR<span className="text-accent"> / studio</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-accent/10 font-medium text-accent'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ExperienceModeSwitch variant="compact" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <a href="#contact" className="hidden sm:block">
              <Button variant="accent" size="sm">
                Get in touch
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileOpen((open) => !open)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-2 rounded-2xl p-4 shadow-sm md:hidden"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}

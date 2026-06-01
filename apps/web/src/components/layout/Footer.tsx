import { PORTFOLIO_OWNER } from '@portfolio/shared';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CURRENT_YEAR = new Date().getFullYear();

const GITHUB_LINK =
  PORTFOLIO_OWNER.socialLinks.find((link) => link.icon === 'github')?.url ??
  `https://github.com/${PORTFOLIO_OWNER.githubUsername}`;

const LINKEDIN_LINK =
  PORTFOLIO_OWNER.socialLinks.find((link) => link.icon === 'linkedin')?.url ??
  'https://linkedin.com';

export function Footer(): React.JSX.Element {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold text-foreground">
            {PORTFOLIO_OWNER.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {CURRENT_YEAR} — Built with React, NestJS & PostgreSQL
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={LINKEDIN_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <Button variant="ghost" size="icon" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

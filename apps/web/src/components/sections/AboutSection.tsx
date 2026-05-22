import type { Profile } from '@portfolio/shared';
import { MapPin, Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { SECTION_IDS } from '@/lib/constants';

interface AboutSectionProps {
  readonly profile: Profile | null;
  readonly isLoading: boolean;
}

export function AboutSection({ profile, isLoading }: AboutSectionProps): React.JSX.Element {
  return (
    <AnimatedSection id={SECTION_IDS.ABOUT}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="About"
          title="Soft visuals, serious engineering"
          description="A calm, product-aware engineering style: elegant interfaces, resilient systems, and infrastructure that supports real teams."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="glass rounded-[2rem] p-6 lg:col-span-3">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Engineering story
            </div>
            <div className="space-y-5">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full" />
                ))
              : profile?.aboutParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="aurora-card glass rounded-[2rem] p-6">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-background/70 font-mono text-2xl font-bold text-foreground">
                {profile?.name
                  ?.split(' ')
                  .map((part) => part[0])
                  .join('') ?? 'AR'}
              </div>
              <h3 className="text-lg font-semibold">{profile?.name}</h3>
              <p className="text-sm text-accent">{profile?.title}</p>
              {profile?.location && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {profile.location}
                </p>
              )}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6">
                {[
                  { label: 'Signature', value: 'Craft + systems' },
                  { label: 'Focus', value: 'Full-stack DevOps' },
                  { label: 'Energy', value: 'Detail obsessed' },
                  { label: 'Edge', value: 'UX-aware backend' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-background/55 p-3">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-0.5 text-sm font-medium">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

import { motion } from 'framer-motion';
import type { Profile } from '@portfolio/shared';
import {
  ArrowRight,
  Download,
  HeartHandshake,
  Layers3,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { ParallaxLayer } from '@/components/motion/ParallaxLayer';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';

interface HeroSectionProps {
  readonly profile: Profile | null;
  readonly isLoading: boolean;
}

export function HeroSection({ profile, isLoading }: HeroSectionProps): React.JSX.Element {
  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="gradient-mesh absolute inset-0" aria-hidden="true" />
      <div className="grid-pattern absolute inset-0" aria-hidden="true" />
      <ParallaxLayer className="floating-orb top-28 left-[8%] h-24 w-24 bg-pink-300/40" offset={34}>
        <motion.div
          className="h-full w-full rounded-full"
          animate={{ y: [0, -18, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </ParallaxLayer>
      <ParallaxLayer className="floating-orb right-[12%] bottom-24 h-32 w-32 bg-violet-300/30" offset={56}>
        <motion.div
          className="h-full w-full rounded-full"
          animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </ParallaxLayer>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <motion.div variants={slideInLeft} className="space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-14 w-full max-w-lg" />
                <Skeleton className="h-20 w-full max-w-md" />
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-100/60 px-3 py-1 text-xs font-medium text-pink-900 dark:bg-pink-400/10 dark:text-pink-100">
                  <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {profile?.title ?? 'Full-Stack Software Engineer'}
                </div>
                <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
                  {profile?.headline ?? 'Building resilient systems'}
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {profile?.subheadline}
                </p>
                <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Design taste', value: 'interfaces with intention' },
                    { label: 'Systems mind', value: 'backend + infra clarity' },
                    { label: 'Delivery style', value: 'calm, polished execution' },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ y: -3, scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                      className="rounded-2xl border border-border bg-card/55 p-3 soft-noise"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="#projects">
                    <Button variant="accent" size="lg">
                      See signature work
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button variant="outline" size="lg">
                      Start a conversation
                    </Button>
                  </a>
                  {profile?.resumeUrl && (
                    <a href={profile.resumeUrl} download>
                      <Button variant="ghost" size="lg">
                        <Download className="h-4 w-4" />
                        Resume
                      </Button>
                    </a>
                  )}
                </div>
              </>
            )}
          </motion.div>

          <motion.div variants={slideInRight}>
            <HeroDashboard profile={profile} isLoading={isLoading} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface HeroDashboardProps {
  readonly profile: Profile | null;
  readonly isLoading: boolean;
}

function HeroDashboard({ profile, isLoading }: HeroDashboardProps): React.JSX.Element {
  const workflowSteps = [
    { label: 'Research', detail: 'map real user friction', icon: Sparkles },
    { label: 'Architect', detail: 'design clean system boundaries', icon: Layers3 },
    { label: 'Ship', detail: 'automate, observe, iterate', icon: HeartHandshake },
  ];

  const metrics = [
    { label: 'Product loops', value: '08', trend: 'discovery to delivery' },
    { label: 'System health', value: '99.97%', trend: 'operability mindset' },
    { label: 'Release rhythm', value: '3x', trend: 'faster feedback cycles' },
  ];

  return (
    <motion.div variants={fadeInUp} className="aurora-card glass rounded-[2rem] p-5 shadow-lg">
      <div className="rounded-[1.5rem] border border-white/20 bg-card/70 p-5">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="font-mono text-xs text-muted-foreground">
              {isLoading ? 'loading...' : `${profile?.name ?? 'Engineer'} workflow`}
            </span>
          </div>
          <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-600 dark:text-green-300">
            Available
          </span>
        </div>

        <div className="space-y-3">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background/55 p-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400/20 to-violet-400/20">
                <step.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-muted/50 p-3">
              <p className="font-mono text-lg font-bold">
                <AnimatedCounter value={metric.value} />
              </p>
              <p className="text-[10px] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

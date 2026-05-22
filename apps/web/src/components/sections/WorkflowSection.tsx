import { motion } from 'framer-motion';
import { HeartHandshake, Radar } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { WORKFLOW_CALLOUTS, WORKFLOW_ITEMS } from '@/lib/workflow-content';
import { cn } from '@/lib/utils';

export function WorkflowSection(): React.JSX.Element {
  return (
    <AnimatedSection id={SECTION_IDS.WORKFLOWS} className="relative overflow-hidden">
      <div className="gradient-mesh absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Working Style"
          title="A portfolio should show how you think, not only what you use"
          description="This section is designed to make the site feel more personal: it frames engineering as judgment, care, and product taste."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {WORKFLOW_ITEMS.map((item, index) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <Card
                  glass
                  className={cn(
                    'h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1',
                    index === 0 && 'sm:translate-y-6',
                    index === 3 && 'sm:-translate-y-6',
                  )}
                >
                  <CardContent className="p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400/25 to-violet-400/20">
                        <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {item.signal}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.aside
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="aurora-card glass flex min-h-[420px] flex-col justify-between rounded-[2rem] p-6 lg:sticky lg:top-28"
          >
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-background/70">
                <Radar className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                Differentiator
              </p>
              <h3 className="mt-3 max-w-sm text-3xl font-bold tracking-tight">
                I connect beautiful UI, backend depth, and release confidence.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Most portfolios show stacks. This one is shaped around decision-making:
                what matters, what can fail, and how the experience should feel from first
                impression to production.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {WORKFLOW_CALLOUTS.map((callout) => (
                <div
                  key={callout}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background/55 p-3"
                >
                  <HeartHandshake className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">{callout}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </AnimatedSection>
  );
}

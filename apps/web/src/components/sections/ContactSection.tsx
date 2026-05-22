import { motion } from 'framer-motion';
import type { Profile } from '@portfolio/shared';
import { CheckCircle, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContactForm } from '@/hooks/use-contact-form';
import { fadeInUp } from '@/lib/animations';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  readonly profile: Profile | null;
}

interface ContactFormState {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection({ profile }: ContactSectionProps): React.JSX.Element {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const { isSubmitting, isSuccess, hasError, errorMessage, submitContact, resetForm } =
    useContactForm();

  const handleChange = (
    field: keyof ContactFormState,
    value: string,
  ): void => {
    setForm((current) => ({ ...current, [field]: value }));
    if (isSuccess || hasError) {
      resetForm();
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await submitContact(form);
    if (!hasError) {
      setForm(INITIAL_FORM);
    }
  };

  return (
    <AnimatedSection id={SECTION_IDS.CONTACT}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Contact"
          title="Bring me the messy problem"
          description="I am especially strong where product experience, backend architecture, and delivery confidence need to meet."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            <div className="aurora-card glass rounded-[2rem] p-6">
              <h3 className="text-lg font-semibold">Best-fit conversations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I love roles and projects where the details matter: workflow design, scalable
                backend systems, DevOps maturity, and polished product delivery.
              </p>
              <div className="mt-5 space-y-2">
                {[
                  'Full-stack product engineering',
                  'Cloud and DevOps platform work',
                  'Complex UX backed by reliable systems',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-background/55 px-3 py-2 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {profile.email}
                </a>
              )}
            </div>

            <div className="flex gap-3">
              {profile?.socialLinks.map((link) => {
                const Icon = link.icon === 'github' ? Github : Linkedin;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="glass flex h-12 w-12 items-center justify-center rounded-2xl transition-colors hover:bg-muted"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <Card glass className="silk-border rounded-[2rem]">
              <CardContent className="pt-6">
                {isSuccess ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500" aria-hidden="true" />
                    <p className="mt-4 text-lg font-semibold">Message sent!</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you for reaching out. I will get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {
                        resetForm();
                        setForm(INITIAL_FORM);
                      }}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        id="contact-name"
                        label="Name"
                        value={form.name}
                        onChange={(value) => handleChange('name', value)}
                        required
                      />
                      <FormField
                        id="contact-email"
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(value) => handleChange('email', value)}
                        required
                      />
                    </div>
                    <FormField
                      id="contact-subject"
                      label="Subject"
                      value={form.subject}
                      onChange={(value) => handleChange('subject', value)}
                      required
                    />
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={(event) => handleChange('message', event.target.value)}
                        className={inputClassName}
                        placeholder="Tell me about your project or opportunity..."
                      />
                    </div>

                    {hasError && errorMessage && (
                      <p className="text-sm text-red-500" role="alert">
                        {errorMessage}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

const inputClassName = cn(
  'w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm',
  'placeholder:text-muted-foreground',
  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1',
  'transition-colors',
);

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly type?: string;
  readonly required?: boolean;
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: FormFieldProps): React.JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName}
      />
    </div>
  );
}

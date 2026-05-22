import type { PortfolioContent, SocialLink } from '@portfolio/shared';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionActions } from '@/components/admin/admin-section-actions';
import { AdminVariableRow } from '@/components/admin/admin-variable-row';
import { AdminSectionCard, AdminStringList } from '@/components/admin/admin-string-list';

interface PortfolioAdminProfileSectionProps {
  readonly content: PortfolioContent;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (content: PortfolioContent) => void;
}

export function PortfolioAdminProfileSection({
  content,
  isReadOnly,
  canEditStructure,
  variant = 'enterprise',
  onChange,
}: PortfolioAdminProfileSectionProps): React.JSX.Element {
  const profile = content.profile;
  const updateProfile = (patch: Partial<typeof profile>): void => {
    onChange({ ...content, profile: { ...profile, ...patch } });
  };

  const updateSocialLink = (index: number, link: SocialLink): void => {
    const next = [...profile.socialLinks];
    next[index] = link;
    updateProfile({ socialLinks: next });
  };

  const addSocialLink = (): void => {
    updateProfile({
      socialLinks: [...profile.socialLinks, { platform: 'Platform', url: '', icon: 'link' }],
    });
  };

  return (
    <section className="space-y-6">
      <AdminSectionCard variant={variant}>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Identity</p>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="profile.name" value={profile.name} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ name: v })} />
          <AdminField label="profile.title" value={profile.title} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ title: v })} />
          <AdminField label="profile.headline" value={profile.headline} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ headline: v })} />
          <AdminField label="profile.subheadline" value={profile.subheadline} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ subheadline: v })} />
          <AdminField label="profile.location" value={profile.location} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ location: v })} />
          <AdminField label="profile.email" type="email" value={profile.email} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ email: v })} />
        </div>
      </AdminSectionCard>

      <AdminSectionCard variant={variant}>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Media & links</p>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="profile.avatarUrl" value={profile.avatarUrl} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ avatarUrl: v })} />
          <AdminField label="profile.resumeUrl" value={profile.resumeUrl} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ resumeUrl: v })} />
        </div>
        <AdminField label="profile.bio" multiline value={profile.bio} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProfile({ bio: v })} />
      </AdminSectionCard>

      <AdminSectionCard variant={variant}>
        <AdminStringList
          title="About paragraphs"
          items={profile.aboutParagraphs}
          variableLabel="aboutParagraphs"
          valueLabel="Paragraph text"
          isReadOnly={isReadOnly}
          canEditVariable={canEditStructure}
          variant={variant}
          onChange={(items) => updateProfile({ aboutParagraphs: items })}
        />
      </AdminSectionCard>

      <AdminSectionCard variant={variant}>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Social links</p>
        {profile.socialLinks.map((link, index) => (
          <div key={`social-${index}`} className="space-y-3 border-t border-zinc-200 pt-4 first:border-0 first:pt-0 dark:border-zinc-800">
            <AdminVariableRow
              variableLabel="socialLinks.platform"
              variableValue={link.platform}
              valueLabel="socialLinks.url"
              value={link.url}
              isReadOnly={isReadOnly}
              canEditVariable={canEditStructure}
              variant={variant}
              onVariableChange={(platform) => updateSocialLink(index, { ...link, platform })}
              onValueChange={(url) => updateSocialLink(index, { ...link, url })}
            />
            <AdminField
              label="socialLinks.icon"
              value={link.icon}
              isReadOnly={isReadOnly}
              variant={variant}
              onChange={(icon) => updateSocialLink(index, { ...link, icon })}
            />
            <AdminSectionActions
              isReadOnly={isReadOnly}
              addLabel="Add social link"
              onAdd={addSocialLink}
              onRemove={() => {
                updateProfile({
                  socialLinks: profile.socialLinks.filter((_, itemIndex) => itemIndex !== index),
                });
              }}
              removeLabel="Remove link"
            />
          </div>
        ))}
        <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add social link" onAdd={addSocialLink} />
      </AdminSectionCard>
    </section>
  );
}

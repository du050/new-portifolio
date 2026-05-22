import type { Certification, PortfolioContent } from '@portfolio/shared';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionActions } from '@/components/admin/admin-section-actions';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionCard } from '@/components/admin/admin-string-list';
import { createEntityId } from '@/lib/admin-editor-utils';
import { cn } from '@/lib/utils';

const CERTIFICATION_STATUSES = ['completed', 'in_progress', 'planned'] as const;

interface PortfolioAdminCertificationsSectionProps {
  readonly content: PortfolioContent;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (content: PortfolioContent) => void;
}

export function PortfolioAdminCertificationsSection({
  content,
  isReadOnly,
  canEditStructure,
  variant = 'enterprise',
  onChange,
}: PortfolioAdminCertificationsSectionProps): React.JSX.Element {
  const isEnterprise = variant === 'enterprise';

  const updateItem = (index: number, item: Certification): void => {
    const next = [...content.certifications];
    next[index] = item;
    onChange({ ...content, certifications: next });
  };

  const addItem = (): void => {
    const item: Certification = {
      id: createEntityId('cert'),
      name: 'New certification',
      issuer: 'Issuer',
      status: 'planned',
      date: null,
      credentialUrl: '',
      description: '',
    };
    onChange({ ...content, certifications: [...content.certifications, item] });
  };

  return (
    <section className="space-y-6">
      {content.certifications.map((item, index) => (
        <AdminSectionCard key={item.id} variant={variant}>
          {canEditStructure ? (
            <AdminField
              label="certifications.id"
              value={item.id}
              isReadOnly={isReadOnly}
              variant={variant}
              onChange={(id) => updateItem(index, { ...item, id })}
            />
          ) : null}
          <AdminField
            label="certifications.name"
            value={item.name}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(name) => updateItem(index, { ...item, name })}
          />
          <AdminField label="certifications.issuer" value={item.issuer} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, issuer: v })} />
          <label className="block space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              certifications.status
            </span>
            <select
              value={item.status}
              disabled={isReadOnly}
              onChange={(event) =>
                updateItem(index, {
                  ...item,
                  status: event.target.value as Certification['status'],
                })
              }
              className={cn(
                'w-full rounded-lg border px-3 py-2 text-sm',
                isEnterprise
                  ? 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'
                  : 'border-zinc-700 bg-zinc-950 text-white',
              )}
            >
              {CERTIFICATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <AdminField label="certifications.date" value={item.date ?? ''} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, date: v || null })} />
          <AdminField label="certifications.credentialUrl" value={item.credentialUrl} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, credentialUrl: v })} />
          <AdminField label="certifications.description" multiline textareaSize="long" value={item.description} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, description: v })} />
          <AdminSectionActions
            isReadOnly={isReadOnly}
            addLabel="Add certification"
            onAdd={addItem}
            onRemove={() => {
              const next = content.certifications.filter((_, itemIndex) => itemIndex !== index);
              onChange({ ...content, certifications: next });
            }}
            removeLabel="Remove"
          />
        </AdminSectionCard>
      ))}
      <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add certification" onAdd={addItem} />
    </section>
  );
}

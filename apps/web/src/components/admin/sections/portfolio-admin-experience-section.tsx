import type { Experience, PortfolioContent } from '@portfolio/shared';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionActions } from '@/components/admin/admin-section-actions';
import { AdminVariableRow } from '@/components/admin/admin-variable-row';
import { AdminSectionCard, AdminStringList } from '@/components/admin/admin-string-list';
import { createEntityId } from '@/lib/admin-editor-utils';

interface PortfolioAdminExperienceSectionProps {
  readonly content: PortfolioContent;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (content: PortfolioContent) => void;
}

export function PortfolioAdminExperienceSection({
  content,
  isReadOnly,
  canEditStructure,
  variant = 'enterprise',
  onChange,
}: PortfolioAdminExperienceSectionProps): React.JSX.Element {
  const updateItem = (index: number, item: Experience): void => {
    const next = [...content.experiences];
    next[index] = item;
    onChange({ ...content, experiences: next });
  };

  const addItem = (): void => {
    const item: Experience = {
      id: createEntityId('exp'),
      company: 'Company',
      role: 'Role',
      location: 'Remote',
      startDate: '2024-01',
      endDate: null,
      current: true,
      description: '',
      achievements: [],
      technologies: [],
    };
    onChange({ ...content, experiences: [...content.experiences, item] });
  };

  return (
    <section className="space-y-6">
      {content.experiences.map((item, index) => (
        <AdminSectionCard key={item.id} variant={variant}>
          <AdminVariableRow
            variableLabel="experiences.role"
            variableValue={item.role}
            valueLabel="experiences.company"
            value={item.company}
            isReadOnly={isReadOnly}
            canEditVariable={canEditStructure}
            variant={variant}
            onVariableChange={(role) => updateItem(index, { ...item, role })}
            onValueChange={(company) => updateItem(index, { ...item, company })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="experiences.location" value={item.location} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, location: v })} />
            <AdminField label="experiences.startDate" value={item.startDate} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, startDate: v })} />
            <AdminField label="experiences.endDate" value={item.endDate ?? ''} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, endDate: v || null })} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={item.current}
              disabled={isReadOnly}
              onChange={(event) => updateItem(index, { ...item, current: event.target.checked })}
            />
            experiences.current
          </label>
          <AdminField label="experiences.description" multiline value={item.description} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateItem(index, { ...item, description: v })} />
          <AdminStringList
            title="Achievements"
            items={item.achievements}
            variableLabel="achievements"
            isReadOnly={isReadOnly}
            canEditVariable={canEditStructure}
            variant={variant}
            onChange={(achievements) => updateItem(index, { ...item, achievements })}
          />
          <AdminStringList
            title="Technologies"
            items={item.technologies}
            variableLabel="technologies"
            isReadOnly={isReadOnly}
            canEditVariable={canEditStructure}
            variant={variant}
            onChange={(technologies) => updateItem(index, { ...item, technologies })}
          />
          <AdminSectionActions
            isReadOnly={isReadOnly}
            addLabel="Add experience"
            onAdd={addItem}
            onRemove={() => {
              const next = content.experiences.filter((_, itemIndex) => itemIndex !== index);
              onChange({ ...content, experiences: next });
            }}
            removeLabel="Remove"
          />
        </AdminSectionCard>
      ))}
      <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add experience" onAdd={addItem} />
    </section>
  );
}

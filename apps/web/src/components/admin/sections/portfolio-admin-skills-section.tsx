import type { PortfolioContent, Skill, SkillCategory } from '@portfolio/shared';
import { Button } from '@/components/ui/Button';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionActions } from '@/components/admin/admin-section-actions';
import { AdminVariableRow } from '@/components/admin/admin-variable-row';
import { AdminSectionCard } from '@/components/admin/admin-string-list';
import { createEntityId } from '@/lib/admin-editor-utils';

interface PortfolioAdminSkillsSectionProps {
  readonly content: PortfolioContent;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (content: PortfolioContent) => void;
}

export function PortfolioAdminSkillsSection({
  content,
  isReadOnly,
  canEditStructure,
  variant = 'enterprise',
  onChange,
}: PortfolioAdminSkillsSectionProps): React.JSX.Element {
  const updateCategory = (index: number, category: SkillCategory): void => {
    const next = [...content.skillCategories];
    next[index] = category;
    onChange({ ...content, skillCategories: next });
  };

  const addCategory = (): void => {
    const category: SkillCategory = {
      id: createEntityId('category'),
      name: 'New category',
      icon: 'sparkles',
      skills: [{ name: 'New skill', level: 50 }],
    };
    onChange({ ...content, skillCategories: [...content.skillCategories, category] });
  };

  const addSkill = (categoryIndex: number): void => {
    const category = content.skillCategories[categoryIndex];
    if (!category) {
      return;
    }
    const skill: Skill = { name: 'New skill', level: 50 };
    updateCategory(categoryIndex, {
      ...category,
      skills: [...category.skills, skill],
    });
  };

  return (
    <section className="space-y-6">
      {content.skillCategories.map((category, categoryIndex) => (
        <AdminSectionCard key={category.id} variant={variant}>
          <AdminVariableRow
            variableLabel="skillCategories.id"
            variableValue={category.id}
            valueLabel="skillCategories.name"
            value={category.name}
            isReadOnly={isReadOnly}
            canEditVariable={canEditStructure}
            variant={variant}
            onVariableChange={(id) => updateCategory(categoryIndex, { ...category, id })}
            onValueChange={(name) => updateCategory(categoryIndex, { ...category, name })}
          />
          <AdminField
            label="skillCategories.icon"
            value={category.icon}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(icon) => updateCategory(categoryIndex, { ...category, icon })}
          />
          <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            {category.skills.map((skill, skillIndex) => (
              <div key={`${category.id}-${skillIndex}`} className="space-y-2">
                <AdminVariableRow
                  variableLabel="skills.name"
                  variableValue={skill.name}
                  valueLabel="skills.level"
                  value={skill.level}
                  valueType="number"
                  isReadOnly={isReadOnly}
                  canEditVariable={canEditStructure}
                  variant={variant}
                  onVariableChange={(name) => {
                    const skills = [...category.skills];
                    skills[skillIndex] = { ...skill, name };
                    updateCategory(categoryIndex, { ...category, skills });
                  }}
                  onValueChange={(value) => {
                    const skills = [...category.skills];
                    skills[skillIndex] = { ...skill, level: Number(value) || 0 };
                    updateCategory(categoryIndex, { ...category, skills });
                  }}
                />
                <AdminField
                  label="skills.years"
                  type="number"
                  value={skill.years ?? ''}
                  isReadOnly={isReadOnly}
                  variant={variant}
                  onChange={(value) => {
                    const skills = [...category.skills];
                    skills[skillIndex] = {
                      ...skill,
                      years: value ? Number(value) : undefined,
                    };
                    updateCategory(categoryIndex, { ...category, skills });
                  }}
                />
                {!isReadOnly ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => {
                      const skills = category.skills.filter((_, index) => index !== skillIndex);
                      updateCategory(categoryIndex, { ...category, skills });
                    }}
                  >
                    Remove skill
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
          <AdminSectionActions
            isReadOnly={isReadOnly}
            addLabel="Add skill"
            onAdd={() => addSkill(categoryIndex)}
            onRemove={() => {
              const next = content.skillCategories.filter((_, index) => index !== categoryIndex);
              onChange({ ...content, skillCategories: next });
            }}
            removeLabel="Remove category"
          />
        </AdminSectionCard>
      ))}
      <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add category" onAdd={addCategory} />
    </section>
  );
}

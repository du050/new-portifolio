import type { LearningPath, PortfolioContent } from '@portfolio/shared';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionActions } from '@/components/admin/admin-section-actions';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionCard, AdminStringList } from '@/components/admin/admin-string-list';
import { createEntityId } from '@/lib/admin-editor-utils';

interface PortfolioAdminLearningSectionProps {
  readonly content: PortfolioContent;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (content: PortfolioContent) => void;
}

export function PortfolioAdminLearningSection({
  content,
  isReadOnly,
  canEditStructure,
  variant = 'enterprise',
  onChange,
}: PortfolioAdminLearningSectionProps): React.JSX.Element {
  const updatePath = (index: number, path: LearningPath): void => {
    const next = [...content.learningPaths];
    next[index] = path;
    onChange({ ...content, learningPaths: next });
  };

  const addPath = (): void => {
    const path: LearningPath = {
      id: createEntityId('learning'),
      title: 'New path',
      description: '',
      progress: 0,
      topics: ['Topic'],
    };
    onChange({ ...content, learningPaths: [...content.learningPaths, path] });
  };

  return (
    <section className="space-y-4">
      {content.learningPaths.map((path, pathIndex) => (
        <AdminSectionCard key={path.id} variant={variant}>
          {canEditStructure ? (
            <AdminField
              label="learningPaths.id"
              value={path.id}
              isReadOnly={isReadOnly}
              variant={variant}
              onChange={(id) => updatePath(pathIndex, { ...path, id })}
            />
          ) : null}
          <AdminField
            label="learningPaths.title"
            value={path.title}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(title) => updatePath(pathIndex, { ...path, title })}
          />
          <AdminField
            label="learningPaths.description"
            multiline
            textareaSize="long"
            value={path.description}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(v) => updatePath(pathIndex, { ...path, description: v })}
          />
          <AdminField
            label="learningPaths.progress"
            type="number"
            value={path.progress}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(v) =>
              updatePath(pathIndex, {
                ...path,
                progress: Math.min(100, Math.max(0, Number(v) || 0)),
              })
            }
          />
          <AdminStringList
            title="Topics"
            items={path.topics}
            fieldLabel="topics"
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(topics) => updatePath(pathIndex, { ...path, topics })}
          />
          <AdminSectionActions
            isReadOnly={isReadOnly}
            addLabel="Add learning path"
            onAdd={addPath}
            onRemove={() => {
              const next = content.learningPaths.filter((_, itemIndex) => itemIndex !== pathIndex);
              onChange({ ...content, learningPaths: next });
            }}
            removeLabel="Remove path"
          />
        </AdminSectionCard>
      ))}
      <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add learning path" onAdd={addPath} />
    </section>
  );
}

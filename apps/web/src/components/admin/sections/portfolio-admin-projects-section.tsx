import type { PortfolioContent, Project, ProjectMetric } from '@portfolio/shared';
import { AdminField } from '@/components/admin/admin-field';
import { AdminSectionActions } from '@/components/admin/admin-section-actions';
import { AdminFieldPair } from '@/components/admin/admin-variable-row';
import { AdminSectionCard, AdminStringList } from '@/components/admin/admin-string-list';
import { createEntityId, slugifyValue } from '@/lib/admin-editor-utils';

interface PortfolioAdminProjectsSectionProps {
  readonly content: PortfolioContent;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant?: 'standalone' | 'enterprise';
  readonly onChange: (content: PortfolioContent) => void;
}

export function PortfolioAdminProjectsSection({
  content,
  isReadOnly,
  canEditStructure,
  variant = 'enterprise',
  onChange,
}: PortfolioAdminProjectsSectionProps): React.JSX.Element {
  const updateProject = (index: number, project: Project): void => {
    const next = [...content.projects];
    next[index] = project;
    onChange({ ...content, projects: next });
  };

  const addProject = (): void => {
    const project: Project = {
      id: createEntityId('project'),
      slug: 'new-project',
      title: 'New project',
      description: '',
      longDescription: '',
      imageUrl: '/avatar.svg',
      techStack: [],
      category: 'fullstack',
      githubUrl: '',
      demoUrl: '',
      featured: false,
      metrics: [{ label: 'Metric', value: '0' }],
      challenges: [],
      architecture: [],
      scalability: [],
    };
    onChange({ ...content, projects: [...content.projects, project] });
  };

  const addMetric = (projectIndex: number): void => {
    const project = content.projects[projectIndex];
    if (!project) {
      return;
    }
    updateProject(projectIndex, {
      ...project,
      metrics: [...project.metrics, { label: 'New metric', value: '0' }],
    });
  };

  return (
    <section className="space-y-6">
      {content.projects.map((project, projectIndex) => (
        <AdminSectionCard key={project.id} variant={variant}>
          <AdminFieldPair
            leftLabel="projects.slug"
            leftValue={project.slug}
            rightLabel="projects.title"
            rightValue={project.title}
            isReadOnly={isReadOnly}
            variant={variant}
            onLeftChange={(slug) => updateProject(projectIndex, { ...project, slug })}
            onRightChange={(title) =>
              updateProject(projectIndex, {
                ...project,
                title,
                slug: canEditStructure ? project.slug : slugifyValue(title),
              })
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="projects.category" value={project.category} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProject(projectIndex, { ...project, category: v })} />
            <AdminField label="projects.imageUrl" value={project.imageUrl} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProject(projectIndex, { ...project, imageUrl: v })} />
            <AdminField label="projects.githubUrl" value={project.githubUrl} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProject(projectIndex, { ...project, githubUrl: v })} />
            <AdminField label="projects.demoUrl" value={project.demoUrl} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProject(projectIndex, { ...project, demoUrl: v })} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={project.featured}
              disabled={isReadOnly}
              onChange={(event) =>
                updateProject(projectIndex, { ...project, featured: event.target.checked })
              }
            />
            projects.featured
          </label>
          <AdminField label="projects.description" multiline textareaSize="long" value={project.description} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProject(projectIndex, { ...project, description: v })} />
          <AdminField label="projects.longDescription" multiline textareaSize="long" value={project.longDescription} isReadOnly={isReadOnly} variant={variant} onChange={(v) => updateProject(projectIndex, { ...project, longDescription: v })} />
          <AdminField
            label="projects.techStack (comma-separated)"
            value={project.techStack.join(', ')}
            isReadOnly={isReadOnly}
            variant={variant}
            onChange={(v) =>
              updateProject(projectIndex, {
                ...project,
                techStack: v.split(',').map((item) => item.trim()).filter(Boolean),
              })
            }
          />

          <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Metrics</p>
            {project.metrics.map((metric, metricIndex) => (
              <MetricRow
                key={`${project.id}-metric-${metricIndex}`}
                metric={metric}
                metricIndex={metricIndex}
                project={project}
                projectIndex={projectIndex}
                isReadOnly={isReadOnly}
                canEditStructure={canEditStructure}
                variant={variant}
                onUpdateProject={updateProject}
                onAddMetric={() => addMetric(projectIndex)}
                onRemoveMetric={() => {
                  const metrics = project.metrics.filter((_, index) => index !== metricIndex);
                  updateProject(projectIndex, { ...project, metrics });
                }}
              />
            ))}
            <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add metric" onAdd={() => addMetric(projectIndex)} />
          </div>

          <AdminStringList
            title="Challenges"
            items={project.challenges}
            fieldLabel="challenges"
            isReadOnly={isReadOnly}
            variant={variant}
            multiline
            onChange={(items) => updateProject(projectIndex, { ...project, challenges: items })}
          />
          <AdminStringList
            title="Architecture"
            items={project.architecture}
            fieldLabel="architecture"
            isReadOnly={isReadOnly}
            variant={variant}
            multiline
            onChange={(items) => updateProject(projectIndex, { ...project, architecture: items })}
          />
          <AdminStringList
            title="Scalability"
            items={project.scalability}
            fieldLabel="scalability"
            isReadOnly={isReadOnly}
            variant={variant}
            multiline
            onChange={(items) => updateProject(projectIndex, { ...project, scalability: items })}
          />

          <AdminSectionActions
            isReadOnly={isReadOnly}
            addLabel="Add project"
            onAdd={addProject}
            onRemove={() => {
              const next = content.projects.filter((_, index) => index !== projectIndex);
              onChange({ ...content, projects: next });
            }}
            removeLabel="Remove project"
          />
        </AdminSectionCard>
      ))}
      <AdminSectionActions isReadOnly={isReadOnly} addLabel="Add project" onAdd={addProject} />
    </section>
  );
}

interface MetricRowProps {
  readonly metric: ProjectMetric;
  readonly metricIndex: number;
  readonly project: Project;
  readonly projectIndex: number;
  readonly isReadOnly: boolean;
  readonly canEditStructure: boolean;
  readonly variant: 'standalone' | 'enterprise';
  readonly onUpdateProject: (index: number, project: Project) => void;
  readonly onAddMetric: () => void;
  readonly onRemoveMetric: () => void;
}

function MetricRow({
  metric,
  metricIndex,
  project,
  projectIndex,
  isReadOnly,
  canEditStructure,
  variant,
  onUpdateProject,
  onAddMetric,
  onRemoveMetric,
}: MetricRowProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      <AdminFieldPair
        leftLabel="metrics.label"
        leftValue={metric.label}
        rightLabel="metrics.value"
        rightValue={metric.value}
        isReadOnly={isReadOnly}
        variant={variant}
        onLeftChange={(label) => {
          const metrics = [...project.metrics];
          metrics[metricIndex] = { ...metric, label };
          onUpdateProject(projectIndex, { ...project, metrics });
        }}
        onRightChange={(value) => {
          const metrics = [...project.metrics];
          metrics[metricIndex] = { ...metric, value };
          onUpdateProject(projectIndex, { ...project, metrics });
        }}
      />
      <AdminSectionActions
        isReadOnly={isReadOnly}
        addLabel="Add metric"
        onAdd={onAddMetric}
        onRemove={onRemoveMetric}
        removeLabel="Remove metric"
      />
    </div>
  );
}

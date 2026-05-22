import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ExperienceMode = 'creative' | 'dashboard';

interface ExperienceModeState {
  readonly mode: ExperienceMode;
  readonly pendingMode: ExperienceMode | null;
  readonly isTransitioning: boolean;
  readonly setMode: (mode: ExperienceMode) => void;
  readonly toggleMode: () => void;
  readonly setIsTransitioning: (value: boolean) => void;
}

const STORAGE_KEY = 'portfolio-experience-mode';
const TRANSITION_MS = 720;

export const useExperienceModeStore = create<ExperienceModeState>()(
  persist(
    (set, get) => ({
      mode: 'creative',
      pendingMode: null,
      isTransitioning: false,
      setMode: (mode: ExperienceMode): void => {
        if (get().mode === mode) {
          return;
        }
        set({ isTransitioning: true, pendingMode: mode });
        window.setTimeout(() => {
          set({ mode, pendingMode: null, isTransitioning: false });
        }, TRANSITION_MS);
      },
      toggleMode: (): void => {
        const nextMode: ExperienceMode =
          get().mode === 'creative' ? 'dashboard' : 'creative';
        get().setMode(nextMode);
      },
      setIsTransitioning: (value: boolean): void => {
        set({ isTransitioning: value });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
);

export const TRANSITION_DURATION_MS = TRANSITION_MS;

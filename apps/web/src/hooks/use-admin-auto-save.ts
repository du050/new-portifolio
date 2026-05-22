import type { PortfolioContent } from '@portfolio/shared';
import { useCallback, useEffect, useRef, useState } from 'react';
import { putAuthApi } from '@/lib/api-client';
import { normalizePortfolioContent } from '@/lib/normalize-portfolio-content';

export type AdminSaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

const AUTO_SAVE_DEBOUNCE_MS = 900;

interface UseAdminAutoSaveInput {
  readonly isEnabled: boolean;
  readonly getContent: () => PortfolioContent | null;
  readonly onPersisted?: (content: PortfolioContent) => void;
}

interface UseAdminAutoSaveResult {
  readonly status: AdminSaveStatus;
  readonly statusMessage: string | null;
  readonly notifyLocalEdit: () => void;
  readonly resetBaseline: (content: PortfolioContent) => void;
  readonly saveNow: () => Promise<void>;
}

export function useAdminAutoSave({
  isEnabled,
  getContent,
  onPersisted,
}: UseAdminAutoSaveInput): UseAdminAutoSaveResult {
  const [status, setStatus] = useState<AdminSaveStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const lastPersistedSnapshotRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveRequestIdRef = useRef(0);
  const getContentRef = useRef(getContent);
  const onPersistedRef = useRef(onPersisted);
  const isEnabledRef = useRef(isEnabled);

  getContentRef.current = getContent;
  onPersistedRef.current = onPersisted;
  isEnabledRef.current = isEnabled;

  const resetBaseline = useCallback((content: PortfolioContent): void => {
    lastPersistedSnapshotRef.current = JSON.stringify(content);
    setStatus('saved');
    setStatusMessage(null);
  }, []);

  const persistContentRef = useRef<() => Promise<void>>(async () => undefined);

  const persistContent = useCallback(async (): Promise<void> => {
    if (!isEnabledRef.current) {
      return;
    }

    const rawContent = getContentRef.current();
    if (!rawContent) {
      return;
    }

    const snapshotAtSaveStart = JSON.stringify(rawContent);
    if (snapshotAtSaveStart === lastPersistedSnapshotRef.current) {
      setStatus('saved');
      setStatusMessage(null);
      return;
    }

    const requestId = saveRequestIdRef.current + 1;
    saveRequestIdRef.current = requestId;
    setStatus('saving');
    setStatusMessage(null);

    try {
      const payload = normalizePortfolioContent(rawContent);
      const updated = await putAuthApi<PortfolioContent, { content: PortfolioContent }>(
        '/admin/portfolio',
        { content: payload },
      );

      if (saveRequestIdRef.current !== requestId) {
        return;
      }

      const persistedNormalized = normalizePortfolioContent(updated);
      lastPersistedSnapshotRef.current = JSON.stringify(persistedNormalized);

      const currentSerialized = JSON.stringify(getContentRef.current());
      const hasSameDraftAsSaved = currentSerialized === snapshotAtSaveStart;

      if (hasSameDraftAsSaved) {
        onPersistedRef.current?.(persistedNormalized);
        setStatus('saved');
        setStatusMessage('Saved — live site preview is up to date.');
        return;
      }

      setStatus('pending');
      setStatusMessage('Saving newer edits…');
      persistContentRef.current();
    } catch (error) {
      if (saveRequestIdRef.current !== requestId) {
        return;
      }
      const message = error instanceof Error ? error.message : 'Auto-save failed';
      setStatus('error');
      setStatusMessage(message);
    }
  }, []);

  persistContentRef.current = persistContent;

  const notifyLocalEdit = useCallback((): void => {
    if (!isEnabledRef.current) {
      return;
    }

    const current = getContentRef.current();
    if (!current) {
      return;
    }

    const serialized = JSON.stringify(current);
    if (lastPersistedSnapshotRef.current === null) {
      lastPersistedSnapshotRef.current = serialized;
      return;
    }

    if (serialized === lastPersistedSnapshotRef.current) {
      setStatus('saved');
      return;
    }

    setStatus('pending');
    setStatusMessage('Unsaved changes…');

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      void persistContentRef.current();
    }, AUTO_SAVE_DEBOUNCE_MS);
  }, []);

  const saveNow = useCallback(async (): Promise<void> => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    await persistContent();
  }, [persistContent]);

  useEffect(() => {
    if (!isEnabled) {
      lastPersistedSnapshotRef.current = null;
      setStatus('idle');
      setStatusMessage(null);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    }
  }, [isEnabled]);

  return {
    status,
    statusMessage,
    notifyLocalEdit,
    resetBaseline,
    saveNow,
  };
}

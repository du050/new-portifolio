import type { PortfolioContent } from '@portfolio/shared';
import { useCallback, useEffect, useRef, useState } from 'react';
import { putAuthApi } from '@/lib/api-client';

export type AdminSaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

const AUTO_SAVE_DEBOUNCE_MS = 700;

interface UseAdminAutoSaveInput {
  readonly content: PortfolioContent | null;
  readonly isEnabled: boolean;
  readonly onSaved: (content: PortfolioContent) => void;
}

interface UseAdminAutoSaveResult {
  readonly status: AdminSaveStatus;
  readonly statusMessage: string | null;
  readonly saveNow: () => Promise<void>;
}

export function useAdminAutoSave({
  content,
  isEnabled,
  onSaved,
}: UseAdminAutoSaveInput): UseAdminAutoSaveResult {
  const [status, setStatus] = useState<AdminSaveStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const lastPersistedSnapshotRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveRequestIdRef = useRef(0);
  const contentRef = useRef(content);

  contentRef.current = content;

  const persistContent = useCallback(async (): Promise<void> => {
    const snapshot = contentRef.current;
    if (!snapshot || !isEnabled) {
      return;
    }

    const serialized = JSON.stringify(snapshot);
    if (serialized === lastPersistedSnapshotRef.current) {
      setStatus('saved');
      return;
    }

    const requestId = saveRequestIdRef.current + 1;
    saveRequestIdRef.current = requestId;
    setStatus('saving');
    setStatusMessage(null);

    try {
      const updated = await putAuthApi<PortfolioContent, { content: PortfolioContent }>(
        '/admin/portfolio',
        { content: snapshot },
      );
      if (saveRequestIdRef.current !== requestId) {
        return;
      }
      const updatedSerialized = JSON.stringify(updated);
      lastPersistedSnapshotRef.current = updatedSerialized;
      onSaved(updated);
      setStatus('saved');
      setStatusMessage('All changes saved.');
    } catch (error) {
      if (saveRequestIdRef.current !== requestId) {
        return;
      }
      const message = error instanceof Error ? error.message : 'Auto-save failed';
      setStatus('error');
      setStatusMessage(message);
    }
  }, [isEnabled, onSaved]);

  const saveNow = useCallback(async (): Promise<void> => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    await persistContent();
  }, [persistContent]);

  useEffect(() => {
    if (!content || !isEnabled) {
      return;
    }

    const serialized = JSON.stringify(content);
    if (lastPersistedSnapshotRef.current === null) {
      lastPersistedSnapshotRef.current = serialized;
      return;
    }

    if (serialized === lastPersistedSnapshotRef.current) {
      return;
    }

    setStatus('pending');
    setStatusMessage('Unsaved changes…');

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      void persistContent();
    }, AUTO_SAVE_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [content, isEnabled, persistContent]);

  useEffect(() => {
    if (!isEnabled) {
      lastPersistedSnapshotRef.current = null;
      setStatus('idle');
      setStatusMessage(null);
    }
  }, [isEnabled]);

  return { status, statusMessage, saveNow };
}

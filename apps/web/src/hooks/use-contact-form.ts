import type { ContactMessage, CreateContactRequest } from '@portfolio/shared';
import { useCallback, useState } from 'react';
import { postApi } from '@/lib/api-client';

interface UseContactFormResult {
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;
  readonly submitContact: (request: CreateContactRequest) => Promise<void>;
  readonly resetForm: () => void;
}

export function useContactForm(): UseContactFormResult {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = useCallback((): void => {
    setIsSuccess(false);
    setHasError(false);
    setErrorMessage(null);
  }, []);

  const submitContact = useCallback(async (request: CreateContactRequest): Promise<void> => {
    setIsSubmitting(true);
    setHasError(false);
    setErrorMessage(null);
    setIsSuccess(false);

    try {
      await postApi<ContactMessage, CreateContactRequest>('/contact', request);
      setIsSuccess(true);
    } catch (error: unknown) {
      setHasError(true);
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    isSubmitting,
    isSuccess,
    hasError,
    errorMessage,
    submitContact,
    resetForm,
  };
}

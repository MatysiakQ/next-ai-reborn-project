import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAsyncOperationOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsyncOperation<T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>,
  options: UseAsyncOperationOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const execute = useCallback(async (...args: T): Promise<R | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await asyncFn(...args);
      
      if (options.successMessage) {
        toast({
          title: "Sukces",
          description: options.successMessage,
        });
      }
      
      options.onSuccess?.();
      return result;
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      
      console.error('Async operation failed:', error);
      
      const errorMessage = options.errorMessage || error.message || 'Wystąpił nieoczekiwany błąd';
      toast({
        title: "Błąd",
        description: errorMessage,
        variant: "destructive",
      });
      
      options.onError?.(error);
      return null;
      
    } finally {
      setLoading(false);
    }
  }, [asyncFn, options, toast]);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return {
    execute,
    loading,
    error,
    reset
  };
}
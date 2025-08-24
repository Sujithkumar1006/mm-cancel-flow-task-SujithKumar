// src/components/cancellation/shared/useFormState.ts
import { useState, useCallback } from "react";

/**
 * Generic nested form state helper.
 * Assumes shape like: { step1: {...}, step2: {...}, ... }
 */
export function useFormState<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState<T>(initial);

  const update = useCallback((step: keyof T, field: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [step]: {
        ...(prev as any)[step],
        [field]: value,
      },
    }));
  }, []);

  const patchStep = useCallback(
    (step: keyof T, partial: Partial<T[keyof T]>) => {
      setValues((prev) => ({
        ...prev,
        [step]: {
          ...(prev as any)[step],
          ...partial,
        },
      }));
    },
    []
  );

  const reset = useCallback(() => setValues(initial), [initial]);

  return { values, setValues, update, patchStep, reset };
}

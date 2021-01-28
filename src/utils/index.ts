import { FieldMetaState } from "react-final-form";

export const getMetaError = <T>({
  active,
  data,
  dirty,
  error,
  submitFailed,
  touched,
}: FieldMetaState<T>): FieldMetaState<T>["error"] | undefined =>
  ((touched || dirty) && error) ||
  (submitFailed && error) ||
  (active && data.error);

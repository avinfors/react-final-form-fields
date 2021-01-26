import { FieldMetaState } from "react-final-form";

export const getMetaError = <T>({
  data,
  dirty,
  error,
  submitFailed,
  touched,
}: FieldMetaState<T>): FieldMetaState<T>["error"] | undefined =>
  ((touched || dirty) && error) || (submitFailed && error) || data.error;

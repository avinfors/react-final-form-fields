import * as React from "react";
import { FormSpy, FormSpyRenderProps } from "react-final-form";

export type WithFormProps = {
  form: FormSpyRenderProps["form"];
};

export default <T extends WithFormProps = WithFormProps>(
  WrappedField: React.ComponentType<T>
): React.FC<T & WithFormProps> => {
  const withForm = (props: Omit<T, keyof WithFormProps>) => (
    <FormSpy>
      {({ form }) => <WrappedField {...(props as T)} form={form} />}
    </FormSpy>
  );

  return withForm;
};

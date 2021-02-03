import * as React from "react";
import { Form } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Row, Col } from "reactstrap";
import addDays from "date-fns/addDays";
import startOfDay from "date-fns/startOfDay";

import "./styles.scss";

const initialValues = {
  dateField: {
    withMinAndMaxDates: addDays(startOfDay(new Date()), -8),
  },
  selectField: {
    simple: { code: "ru", name: "the Russian Federation" },
  },
};

const validate = (values) => {
  const errors = {};

  errors.dateField = {};

  for (const [field, value] of Object.entries(values.dateField)) {
    if (typeof value === "string") {
      errors.dateField[field] = value;
    }
  }

  return errors;
};

const withFinalForm = (Story) => (
  <Row form>
    <Col md={6}>
      <Form
        component={Story}
        initialValues={initialValues}
        mutators={{ setFieldData }}
        onSubmit={() => {}}
        validate={validate}
      />
    </Col>
  </Row>
);

export const decorators = [withFinalForm];

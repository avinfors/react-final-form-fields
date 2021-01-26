import { Form } from "react-final-form";
import { Row, Col } from "reactstrap";

import "./styles.scss";

const withFinalForm = (Story) => (
  <Row form>
    <Col md={6}>
      <Form component={Story} onSubmit={() => {}} />
    </Col>
  </Row>
);

export const decorators = [withFinalForm];

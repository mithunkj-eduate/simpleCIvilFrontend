// components/forms/contact/ContactForm.tsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PortfolioDataProps } from "./MetaForm";

const schema = Yup.object({
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
});

export default function ContactForm({
  initialValues,
  onSubmit,
}: PortfolioDataProps) {
  const sunmit = () => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit ? onSubmit : sunmit}
    >
      <Form className="space-y-4">
        <Field name="email" placeholder="Email" className="input" />
        <Field name="phone" placeholder="Phone" className="input" />
        <Field name="address" placeholder="Address" className="input" />

        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}

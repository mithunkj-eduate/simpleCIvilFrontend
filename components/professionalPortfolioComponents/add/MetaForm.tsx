// components/forms/meta/MetaForm.tsx
"use client";

import { PortfolioData } from "@/lib/types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().required("Name required"),
  profession: Yup.string().required(),
  slug: Yup.string().required(),
  tagline: Yup.string().required(),
});

export interface PortfolioDataProps {
  initialValues: PortfolioData;
  onNext: (values: PortfolioData) => void;
  onSubmit?: () => void;
}

export default function MetaForm({
  initialValues,
  onNext,
}: PortfolioDataProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onNext}
    >
      {() => (
        <Form className="space-y-4">
          <Field name="name" placeholder="Name" className="input" />
          {/* {errors?.name && touched?.name && <p>{errors?.name}</p>} */}

          <Field name="slug" placeholder="Slug" className="input" />

          <Field as="select" name="profession" className="input">
            <option value="">Select</option>
            <option value="doctor">Doctor</option>
            <option value="store">Store</option>
          </Field>

          <Field name="tagline" placeholder="Tagline" className="input" />

          <button type="submit" className="btn">
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
}




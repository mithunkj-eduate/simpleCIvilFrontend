// components/forms/services/ServicesForm.tsx
import { Formik, Form, Field, FieldArray } from "formik";
import { PortfolioDataProps } from "./MetaForm";

export default function ServicesForm({ initialValues, onNext }: PortfolioDataProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onNext}>
      {({ values }) => (
        <Form>
          <FieldArray name="services">
            {({ push, remove }) => (
              <div className="space-y-4">
                {values.services && values.services.map((_, i) => (
                  <div key={i} className="border p-4">
                    <Field name={`services.${i}.title`} placeholder="Title" />
                    <Field name={`services.${i}.price`} placeholder="Price" />

                    <button type="button" onClick={() => remove(i)}>Delete</button>
                  </div>
                ))}

                <button type="button" onClick={() => push({ title: "", price: "" })}>
                  Add Service
                </button>
              </div>
            )}
          </FieldArray>

          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  );
}
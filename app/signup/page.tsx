"use client";

import React, { useState } from "react";
import { Label } from "@/stories/Label/Label";
import { Input } from "@/stories/Input/Input";
import NavBar from "@/components/commen/Navbar";
import {
  AuthMethod,
  LicenseTypes,
  Operation,
  UserType,
} from "@/utils/enum.types";
import { api } from "@/components/helpers/apiheader";
import { useFormik, FormikHelpers } from "formik";
import { SignupSchema } from "@/validations/validationSchemas";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import MessageModal from "@/customComponents/MessageModal";

export interface SignupFormValues {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: UserType;
}

export const SignupFormJson = [
  { labelName: "Name", inputName: "name", dataType: "text", required: true },
  {
    labelName: "Password",
    inputName: "password",
    dataType: "password",
    required: true,
  },
  { labelName: "Email", inputName: "email", dataType: "email", required: true },
  {
    labelName: "Phone Number",
    inputName: "phoneNumber",
    dataType: "number",
    required: true,
  },
  { labelName: "Role", inputName: "role", dataType: "role", required: true },
] as const;

export const UserTypeData: UserType[] = [
  UserType.ADMIN,
  UserType.PICE_WORKER,
  UserType.PROJECT_MANAGER,
  UserType.RESELLER,
  UserType.SELLER,
  UserType.SYSTEM_ADMIN,
  UserType.USER,
  UserType.RAIDER,
];

const Signup: React.FC = () => {
  const initialValues: SignupFormValues = {
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: UserType.USER,
  };
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const formik = useFormik<SignupFormValues>({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (
      values: SignupFormValues,
      _: FormikHelpers<SignupFormValues>
    ) => {
      try {
        const body = {
          ...values,
          authMethod: AuthMethod.EMAIL_AUTH,
        };

        const res = await api.post(`/users/register`, body, {
          headers: { "Content-Type": "application/json" },
        });

        if (res)
          setMessage({
            flag: true,
            message: "Signup successful!",
            operation: Operation.NONE,
          });
      } catch (error) {
        console.error("Signup error:", error);
      }
    },
  });

  return (
    <>
      <NavBar NavType={LicenseTypes.USER} />

      <div className="isolate bg-white px-6 sm:py-8 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold text-gray-900">
            Signup Your Account
          </h2>
        </div>

        {/* FORM START */}
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {SignupFormJson.map((item, index) => {
              if (item.inputName === "role") {
                return (
                  <fieldset key={index}>
                    <Label>User Role</Label>

                    <div className="mt-6 space-y-3">
                      {UserTypeData.map((role) => (
                        <div key={role} className="flex items-center gap-x-3">
                          <input
                            id={`role-${role}`}
                            name="role"
                            type="radio"
                            value={role}
                            checked={formik.values.role === role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="size-4 rounded-full border border-gray-300"
                          />
                          <Label htmlFor={`role-${role}`}>{role}</Label>
                        </div>
                      ))}
                    </div>

                    {formik.touched.role && formik.errors.role && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.role}
                      </p>
                    )}
                  </fieldset>
                );
              }

              return (
                <div key={index} className="sm:col-span-3">
                  <Label className="block text-sm font-semibold text-gray-900">
                    {item.labelName}
                  </Label>

                  <div className="mt-2">
                    <Input
                      type={item.dataType}
                      name={item.inputName}
                      value={formik.values[item.inputName]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched[item.inputName] &&
                    formik.errors[item.inputName] && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors[item.inputName]}
                      </p>
                    )}
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Signup
            </button>
          </div>

          <p className="mt-4 text-center text-sm">
            Already a member?{" "}
            <a href="/login" className="text-indigo-600">
              Login
            </a>
          </p>
        </form>
        {/* FORM END */}
      </div>
      <MessageModal
        handleClose={() => {
          setMessage(emptyMessage);
        }}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </>
  );
};

export default Signup;

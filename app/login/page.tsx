"use client";

import NavBar from "@/components/commen/Navbar";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { LicenseTypes } from "@/utils/enum.types";
import { api } from "@/components/helpers/apiheader";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginSchema } from "@/validations/validationSchemas";

// JSON Config
export const LoginFormJson = [
  {
    labelName: "Phone Number",
    inputName: "phoneNumber",
    dataType: "number",
    autoFocus: true,
    required: true,
  },
  {
    labelName: "Password",
    inputName: "password",
    dataType: "password",
    required: true,
  },
] as const;

interface LoginFormValues {
  phoneNumber: string;
  password: string;
}

const Login: React.FC = () => {
  const nav = useRouter();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post(`/users/login`, values, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          Cookies.set("token", res.data.token, { expires: 7 });

          nav.push("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message || "Login failed");
        } else {
          alert("Unexpected error occurred");
        }
      }
    },
  });

  return (
    <>
      <NavBar NavType={LicenseTypes.USER} />

      <div className="isolate bg-white px-6 py-8 sm:py-8 lg:px-8">
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
            Login Your Account
          </h2>
        </div>

        {/* FORM */}
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {LoginFormJson.map((item, idx) => (
              <div key={idx} className="sm:col-span-3">
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

                {/* Validation Error */}
                {formik.touched[item.inputName] &&
                  formik.errors[item.inputName] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors[item.inputName]}
                    </p>
                  )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-4 py-2.5 text-white font-semibold hover:bg-indigo-500"
            >
              Login
            </button>
          </div>

          <p className="mt-4">
            Not a member? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

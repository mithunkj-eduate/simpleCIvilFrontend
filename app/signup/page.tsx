"use client";
import { Label } from "@/stories/Label/Label";
import { Input } from "@/stories/Input/Input";
import { Button } from "@/stories/Button/Button";
import NavBar from "@/components/commen/Navbar";
import React, { useState } from "react";
import { AuthMethod, LicenseTypes, UserType } from "@/utils/enum.types";
import { api } from "@/components/helpers/apiheader";

export const SignupFormJson = [
  {
    labelName: "Name",
    inputName: "name",
    dataType: "text",
    autoFocus: true,
    required: true,
  },
  {
    labelName: "Password",
    inputName: "password",
    dataType: "password",
    required: true,
  },
  {
    labelName: "Email",
    inputName: "email",
    dataType: "email",
    required: true,
  },
  {
    labelName: "Phone Number",
    inputName: "phoneNumber",
    dataType: "number",
    required: true,
  },
  {
    labelName: "Role",
    inputName: "role",
    dataType: "role",
    required: true,
  },
];

export const UserTypeData = [
  UserType.ADMIN,
  UserType.PICE_WORKER,
  UserType.PROJECT_MANAGER,
  UserType.RESELLER,
  UserType.SELLER,
  UserType.SYSTEM_ADMIN,
  UserType.USER,
  UserType.DELIVERY_BOY
];

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: UserType.USER,
  });

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
   
    try {
      if (
        !formData.name ||
        !formData.password ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.role
      ) {
        return;
      }
      const body = {
        ...formData,
        authMethod: AuthMethod.EMAIL_AUTH,
      };

      const res = await api.post(`/users/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res",res)
      alert("Signup successful!");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <>
      <NavBar NavType={LicenseTypes.USER} />

      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Signup Your Account
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600"></p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {SignupFormJson.map((item, index) => {
              if (item.inputName === "role") {
                return (
                  <fieldset key={index}>
                    <Label htmlFor="role"> User Role </Label>

                    <div className="mt-6 space-y-6">
                      {UserTypeData.map((role) => {
                        return (
                          <div key={role} className="flex items-center gap-x-3">
                            <input
                              id={`role-${role}`}
                              name="role"
                              type="radio"
                              value={role}
                              checked={formData.role === role}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  role: e.target.value as UserType,
                                });
                              }}
                              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                              required={item.required}
                            />
                            <Label htmlFor={`role-${role}`}>{role}</Label>
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              } else {
                return (
                  <div key={index} className="sm:col-span-3">
                    <Label
                      htmlFor="email"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      {item.labelName}
                    </Label>
                    <div className="mt-2">
                      <Input
                        type={item.dataType}
                        name={item.inputName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [item.inputName]: e.target.value,
                          });
                        }}
                        required={item.required}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </div>
          <p>
            You are member? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}

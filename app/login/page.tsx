"use client";
import NavBar from "@/components/commen/Navbar";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { LicenseTypes } from "@/utils/enum.types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { api } from "@/components/helpers/apiheader";
import Cookies from "js-cookie";

export const LoginFormJson = [
  {
    labelName: "Phone Number",
    inputName: "phoneNumber",
    dataType: "phoneNumber",
    autoFocus: true,
    required: true,
  },
  {
    labelName: "Password",
    inputName: "password",
    dataType: "password",
    required: true,
  },
];

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const nav = useRouter();

  const handleSubmit = async () => {
    try {
      if (formData) {
        const res = await api.post(`/users/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          // Handle successful login, e.g., redirect or show a success message
          localStorage.setItem("token", res.data.token);
          Cookies.set("token", res.data.token, { expires: 7 }); //7 days
          nav.push("/");
        } else {
          console.error("Login failed:", res.data);
          alert(`${res.data.message || "Login failed"}`);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error)) {
        // Handle specific Axios error
        alert(`Error: ${error.response?.data.message || "Login failed"}`);
      } else {
        // Handle general error
        alert("An unexpected error occurred. Please try again.");
      }
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
            Login You Account
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600"></p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {LoginFormJson.map((item, index) => {
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
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

import { ChevronDownIcon } from "@heroicons/react/16/solid";

function Example() {
  return (
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
          Login
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600"></p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {LoginFormJson.map((item, index) => {
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
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

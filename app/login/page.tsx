"use client";
import NavBar from "@/components/commen/Navbar";
import api from "@/components/helpers/apiheader";
import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { LicenseTypes } from "@/utils/enum.types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const { BASE_URL } = api();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const nav = useRouter();

  const handleSubmit = async () => {
    try {
      if (BASE_URL && formData) {
        const res = await axios.post(`${BASE_URL}/users/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          // Handle successful login, e.g., redirect or show a success message
          localStorage.setItem("token", res.data.token);
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

      <div className=" p-4 mt-24 m-2">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900 text-center">
              Login Your Account
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {LoginFormJson.map((item, index) => {
                return (
                  <div key={index} className="sm:col-span-3">
                    <Label htmlFor="email">{item.labelName}</Label>
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
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Button mode="primary" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;

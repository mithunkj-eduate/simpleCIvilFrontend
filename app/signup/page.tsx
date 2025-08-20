"use client";
import { Label } from "@/stories/Label/Label";
import { Input } from "@/stories/Input/Input";
import { Button } from "@/stories/Button/Button";
import NavBar from "@/components/commen/Navbar";
import React, { useState } from "react";
import { AuthMethod, LicenseTypes, UserType } from "@/utils/enum.types";
import  { api } from "@/components/helpers/apiheader";

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
];

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const handleSubmit = async () => {
    try {
      const body = {
        name: "kiran",
        password: "123123",
        email: "kiran@gmail.com",
        phoneNumber: "6361849002",
        role: UserType.SYSTEM_ADMIN,
        authMethod: AuthMethod.EMAIL_AUTH,
      };

      const res = await api.post(`/users/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Signup successful!");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <>
      <NavBar NavType={LicenseTypes.USER} />
      <div className=" p-4 mt-24 m-2">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900 text-center">
              Signup Your Account
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {SignupFormJson.map((item, index) => {
                if (item.inputName === "role") {
                  return (
                    <fieldset key={index}>
                      <Label htmlFor="role"> User Role </Label>

                      <div className="mt-6 space-y-6">
                        {UserTypeData.map((role) => {
                          return (
                            <div
                              key={role}
                              className="flex items-center gap-x-3"
                            >
                              <input
                                id={`role-${role}`}
                                name="role"
                                type="radio"
                                value={role}
                                checked={formData.role === role}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    role: e.target.value,
                                  });
                                }}
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
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
                }
              })}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Button mode="primary" onClick={handleSubmit}>
            Signup
          </Button>
        </div>
      </div>
    </>
  );
}

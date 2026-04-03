"use client";

import NavBar from "@/components/commen/Navbar";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import { api } from "@/components/helpers/apiheader";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "@/validations/validationSchemas";
import { ApiErrorResponse, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import MessageModal from "@/customComponents/MessageModal";
import { AppContext } from "@/context/context";
import Loading from "@/components/helpers/Loading";

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

enum stepEnum {
  login = "login",
  otp = "otp",
}

const Login: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const { state } = useContext(AppContext);
  const [step, setStep] = useState<stepEnum>(stepEnum.login);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // store from backend
  const [loading, setLoading] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: LoginSchema,
    // onSubmit: async (values) => {
    //   try {
    //     const res = await api.post(`/users/login`, values, {
    //       headers: { "Content-Type": "application/json" },
    //     });

    //     if (res.status === 200) {
    //       localStorage.setItem("token", res.data.token);
    //       Cookies.set("token", res.data.token, { expires: 7 });

    //       router.push("/?v=2");
    //     }
    //   } catch (error) {
    //     // if (axios.isAxiosError(error)) {
    //     //   alert(error.response?.data.message || "Login failed");
    //     // } else {
    //     //   alert("Unexpected error occurred");
    //     // }

    //     const axiosError = error as AxiosError<ApiErrorResponse>;
    //     console.log(axiosError, "axios");

    //     if (axiosError.response) {
    //       const { status } = axiosError.response;
    //       // 1. Server responded (e.g., 429, 401)
    //       if (status === 429) {
    //         const retryAfter = axiosError.response.headers["retry-after"];
    //         // console.error(
    //         //   `Rate limited! Try again in ${retryAfter || "a few"} seconds.`,
    //         // );
    //         setMessage({
    //           flag: true,
    //           message: `Rate limited! Try again in ${retryAfter || "a few"} seconds.`,
    //           operation: Operation.NONE,
    //         });
    //         // Show "Too many attempts" message to the user
    //       } else {
    //         setMessage({
    //           flag: true,
    //           message: axiosError.response.data?.message ?? "Login failed",
    //           operation: Operation.NONE,
    //         });
    //       }
    //     } else if (axiosError.request) {
    //       // 2. No response received (Network error / CORS)
    //       setMessage({
    //         flag: true,
    //         message:
    //           axiosError?.message ??
    //           "Network issue. Please check your connection.",
    //         operation: Operation.NONE,
    //       });
    //     } else {
    //       // 3. Something else happened during setup
    //       setMessage({
    //         flag: true,
    //         message: axiosError?.message ?? "An unexpected error occurred",
    //         operation: Operation.NONE,
    //       });
    //     }
    //   }
    // },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await api.post(`/users/login`, values);

        if (res.status === 200) {
          // ✅ backend sends email or userId
          setEmail(res.data.email); // or res.data.userId
          setStep(stepEnum.otp);

          setMessage({
            flag: true,
            message: "OTP sent to your email",
            operation: Operation.CREATE,
          });
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/users/verifyLoginOtp`, {
        email,
        otp,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        Cookies.set("token", res.data.token, { expires: 7 });

        router.push("/?v=2");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: unknown) => {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.response) {
      const { status } = axiosError.response;

      if (status === 429) {
        const retryAfter = axiosError.response.headers["retry-after"];
        setMessage({
          flag: true,
          message: `Rate limited! Try again in ${retryAfter || "a few"} seconds.`,
          operation: Operation.NONE,
        });
      } else {
        setMessage({
          flag: true,
          message: axiosError.response.data?.message ?? "Request failed",
          operation: Operation.NONE,
        });
      }
    } else {
      setMessage({
        flag: true,
        message: "Network error",
        operation: Operation.NONE,
      });
    }
  };

  if (loading) return <Loading />;

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
        {step === stepEnum.login ? (
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
              Not a member? <a href={`/signup?v=${state.version}`}>Signup</a>
            </p>
          </form>
        ) : (
          <>
            <div className="mx-auto mt-16 max-w-xl text-center">
              <h3 className="text-xl font-semibold">Enter OTP</h3>
              <p className="text-sm text-gray-500 mt-2">
                OTP sent to your email
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="mt-6 text-center text-2xl tracking-[10px] border p-3 rounded w-full"
                placeholder="------"
              />

              <button
                onClick={handleVerifyOtp}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded"
              >
                Verify OTP
              </button>

              <button
                onClick={() => setStep(stepEnum.login)}
                className="mt-3 text-sm text-gray-500"
              >
                Change login details
              </button>
            </div>
          </>
        )}
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

export default Login;

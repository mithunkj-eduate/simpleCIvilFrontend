import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  role: Yup.string().required("Role required"),
});

export const LoginSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string().required("Password is required"),
});
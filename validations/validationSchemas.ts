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

export const checkoutValidation = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Enter a valid name"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  deliveryAddress: Yup.string()
    .required("Delivery address is required")
    .min(5, "Address is too short"),

  paymentMethod: Yup.string().required("Select payment method"),
});

//  VALIDATION SCHEMA ADD STORE
export const AddStoreValidation = Yup.object().shape({
  name: Yup.string().required("Store name is required"),
  address: Yup.string().required("Address is required"),
  latitude: Yup.number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
  longitude: Yup.number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
});

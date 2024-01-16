import * as yup from "yup";
export const LoginValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const resetPasswordValidationSchema = yup.object({
  password: yup
    .string("Enter your old password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Old Password is required"),

  new_Password: yup
    .string("Enter your new password")
    .min(8, " new Password should be of minimum 8 characters length")
    .required(" New password is required"),
  Confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("new_Password"), null],
      "New Passwords and confirm password must match"
    ),
    
});

export const otpValidationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export const addEmployeeValidationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),

  Confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Passwords and confirm password must match"
    ),
});
export const editAddDataValidation = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

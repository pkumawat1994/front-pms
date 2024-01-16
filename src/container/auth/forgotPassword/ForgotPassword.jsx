// import React from 'react'

// const ForgotPassword = () => {
//   return (
//     <div>ForgotPassword</div>
//   )
// }

// export default ForgotPassword

import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../Auth.css";
import { useFormik } from "formik";
import { LoginValidationSchema, otpValidationSchema } from "../../../validation/AllSchemas";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../redux/authService";

const Login = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(forgotPassword({ data: values, navigate }));
    },
  });
 
  return (
    <>
      <Box className="form-box">
        <Box className="form-form-wrapper">
          <Box className="input-field-box">
            <form onSubmit={formik.handleSubmit}>
              {/* <Box className="form-heading">LOGIN FORM</Box> */}
              <TextField
                label="Email"
                className="form-input"
                fullWidth
                size="small"
                variant="outlined"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <Box className="form-submit-button">
                <Button
                  className="form-button"
                  variant="contained"
                  type="submit"
                >
                  Send Otp On Email
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;

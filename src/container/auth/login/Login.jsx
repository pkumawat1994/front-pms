import { Warning } from "@mui/icons-material";
import { Box, Button, Checkbox, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import "../Auth.css";
import { useFormik } from "formik";
import { LoginValidationSchema } from "../../../validation/AllSchemas";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../../redux/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checkVal, setCheckVal] = useState(true);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(loginAdmin({ data: values, navigate }));
    },
  });
  const handleCheckChange = () => {
    setCheckVal(!checkVal);
  };
  return (
    <>
      <Box className="form-box">
        <Box className="form-form-wrapper">
          <Box className="input-field-box">
            <form onSubmit={formik.handleSubmit}>
              <Box className="form-heading">LOGIN FORM</Box>
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
              <TextField
                label="Password"
                className="form-input"
                fullWidth
                name="password"
                size="small"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box className="forgot-password-area">
                <Box>
                  <Checkbox
                    checked={checkVal}
                    onChange={handleCheckChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Remember Me
                </Box>
                <Link to="/forgot-password">
                  <p>Forgot password?</p>
                </Link>
              </Box>
              <Box className="form-submit-button">
                <Button
                  className="form-button"
                  variant="contained"
                  type="submit"
                >
                  Submit
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

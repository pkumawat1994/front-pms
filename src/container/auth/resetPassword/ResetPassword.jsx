import { Warning } from "@mui/icons-material";
import { Box, Button, Checkbox, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import "../Auth.css";
import { useFormik } from "formik";
import { LoginValidationSchema, resetPasswordValidationSchema } from "../../../validation/AllSchemas";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { AdminResetPassword, loginAdmin } from "../../../redux/authService";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm_password, setConfirm_password] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [checkVal, setCheckVal] = useState(true);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location=useLocation();
  console.log(location.state.user._id,"locat")
  let userId=location?.state?.user?._id;

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      Confirm_password: "",
      new_Password: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
    //   alert(JSON.stringify(values, null, 2));
      let AddIdInObj={...values,UserId:userId}
      dispatch(AdminResetPassword({ data: AddIdInObj, navigate }));
    },
  });
 

  const handleToggleConfirmPassword = () => {
    setConfirm_password((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  return (
    <>
      <Box className="form-box">
        <Box className="form-form-wrapper">
          <Box className="input-field-box">
            <form onSubmit={formik.handleSubmit}>
              <Box className="reset-form-heading">RESET PASSWORD</Box>

              <TextField
                label="Old Password"
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
              

              <TextField
                label="New Password"
                className="form-input"
                fullWidth
                name="new_Password"
                size="small"
                variant="outlined"
                type={showNewPassword ? "text" : "password"}
                value={formik.values.new_Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.new_Password &&
                  Boolean(formik.errors.new_Password)
                }
                helperText={
                  formik.touched.new_Password && formik.errors.new_Password
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleNewPassword} edge="end">
                        {showNewPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

<TextField
                label="Confirm New Password"
                className="form-input"
                fullWidth
                name="Confirm_password"
                size="small"
                variant="outlined"
                type={showConfirm_password ? "text" : "password"}
                value={formik.values.Confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Confirm_password &&
                  Boolean(formik.errors.Confirm_password)
                }
                helperText={
                  formik.touched.Confirm_password &&
                  formik.errors.Confirm_password
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirm_password ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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

export default ResetPassword;

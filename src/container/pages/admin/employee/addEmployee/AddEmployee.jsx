import React, { useState } from "react";
import "./AddEmployee.css";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import {
  addEmployeeValidationSchema,
  editAddDataValidation,
} from "../../../../../validation/AllSchemas";
import { addEmployee, updateEmployee } from "../../../../../redux/allSlices/employeeService";

const AddEmployee = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm_password, setConfirm_password] = useState(false);
  let location = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  console.log(location, "loca");
  let editData = location?.state;

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPassword = () => {
    setConfirm_password((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: editData ? editData.name : "",
      email: editData ? editData.email : "",
      password: "",
      Confirm_password: "",
    },
    validationSchema: editData
      ? editAddDataValidation
      : addEmployeeValidationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      if (editData) {
        const modData={...values,_id:editData._id}
        
        dispatch(updateEmployee({ data: modData, navigate }));
      } else {
        dispatch(addEmployee({ data: values, navigate }));
        resetForm();
      }
    },
  });
  return (
    <Box className="form-wrapper-main">
      <Box className="form-box">
        <Box className="form-heading">
          {" "}
          {editData ? "UPDATE EMPLOYEE" : "ADD EMPLOYEE"}
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            className="form-input"
            fullWidth
            size="small"
            variant="outlined"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          {editData ? (
            ""
          ) : (
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
              error={formik.touched.password && Boolean(formik.errors.password)}
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
          )}

          {editData ? (
            ""
          ) : (
            <TextField
              label="Confirm Password"
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
          )}
          <Button className="form-button" variant="contained" type="submit">
            {editData ? "UPDATE" : "ADD"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddEmployee;

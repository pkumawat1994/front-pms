import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Box, Button } from "@mui/material";
import "./Otp.css";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../../redux/authService";

const Otp = () => {
  const [otp, setOtp] = useState("");
  let location = useLocation();
  let dispatch = useDispatch();
  let navigate=useNavigate();

  const customInputStyle = {
    width: "40px",
    height: "40px",
    fontSize: "16px",
    textAlign: "center",
  };

  const handleOtpChange = (value) => {
    // Validate if the entered value is a number and length is within the expected range
    if (!isNaN(Number(value)) && value.length <= 6) {
      setOtp(value);
    }
  };

  console.log(location?.state, 123456);
  const handleClick = () => {
    let otpObj = { user_Id: location?.state?.data?._id, otp: otp };
    let token=location.state.token

    dispatch(verifyOtp({data:otpObj,token,navigate}));
    // /verify-otp
    console.log(otp, "otp");
  };
  return (
    <>
      <Box className="otp-compo">
        <h3>Enter Otp</h3>
        <Box className="otp-input-form">
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            inputType="number"
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input {...props} style={customInputStyle} />
            )}
          />
          <Box className="form-submit-button">
            <Button
              className="form-button"
              variant="contained"
              onClick={handleClick}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Otp;

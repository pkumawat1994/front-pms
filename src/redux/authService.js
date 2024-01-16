import { API } from "../config/Api";
import { DataService } from "../config/DataService";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginAdmin = createAsyncThunk(
  "adminAuth/loginAdmin", async ({data, navigate}, { rejectWithValue }) => {
    try {
      console.log(data,14)
      const response = await DataService.post(API.ADMIN_LOGIN, data);
      console.log("login-res", response);
      if (response.data.status == 200) {
        localStorage.setItem("adminToken", response?.data?.token);
        navigate("/admin/dashbaord");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const AdminResetPassword = createAsyncThunk(
  "adminAuth/AdminResetPassword", async ({data, navigate}, { rejectWithValue }) => {
    try {
      console.log(data,14)
      const response = await DataService.post(API.RESET_PASSWORD, data);
      console.log("login-res", response);
      if (response.status == 200) {
        // localStorage.setItem("adminToken", response?.data?.token);
        navigate("/");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);



export const forgotPassword = createAsyncThunk(
  "adminAuth/forgotPassword", async ({data, navigate}, { rejectWithValue }) => {
    try {
      console.log(data,14)
      const response = await DataService.post(API.FORGOT_PASSWORD, data);
      console.log("login-res", response);
      if (response.data.status == 200) {
        let token =response?.data
        // localStorage.setItem("adminToken", response?.data?.token);
        navigate("/input-otp",{state:token});
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const verifyOtp= createAsyncThunk(
  "adminAuth/verifyOtp", async ({data,token,navigate}, { rejectWithValue }) => {
    try {
      console.log(data,14)
      const response = await DataService.post(API.VERIFY_OTP, data, {
        headers: {
          authorization:token, // Add the token to the Authorization header
        },
      });
      console.log("verify_res", response);
      if (response?.status == 200) {
        let data =response?.data
        navigate("/reset-password",{state:data});
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


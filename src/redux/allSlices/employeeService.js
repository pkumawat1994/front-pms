import { API } from "../../config/Api";
import { DataService } from "../../config/DataService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEmployeeList = createAsyncThunk(
  "Employee/getEmployeeList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DataService.get(API.EMPLOYEE_LIST);
      console.log("login-res", response);
      if (response.data.status == 200) {
        // localStorage.setItem("adminToken", response?.data?.token);
        // navigate("/admin/dashbaord");
        alert("emp-list");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      console.log("last_ID", data);
      const response = await DataService.delete(
        `${API.DELETE_EMPLOYEE}/${data}`
      );
      console.log("delete-emp-res", response);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "Employee/addEmployee",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      console.log("employeeData", data);
      const response = await DataService.post(API.ADD_EMPLOYEE, data);
      console.log("add-emp-res", response);
      if (response.status == 201) {
        navigate("/admin/dashbaord/employee-list");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateEmployee = createAsyncThunk(
  "Emplyee/updateEmployee",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      console.log("employeeData", data);
      const response = await DataService.put(
        `${API.UPDATE_EMPLOYEE}/${data?._id}`,
        data
      );
      console.log("update-emp-res", response);
      if (response?.status == 200) {
        navigate("/admin/dashbaord/employee-list");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const searchEmployee = createAsyncThunk(
  "Emplyee/searchEmployee",
  async (data, { rejectWithValue }) => {
    try {
      console.log("employeeData", data);
      const response = await DataService.get(`${API.SEARCH_EMPLOYEE}/${data}`);
      console.log("serach_emp", response);
      // if (response?.status == 200) {
      //   navigate("/admin/dashbaord/employee-list");
      // }
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

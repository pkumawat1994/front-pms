import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addEmployee, getEmployeeList, updateEmployee } from "../employeeService";

const EmployeeSlice = createSlice({
  name: "Employee",
  initialState: {
    token: "",
    userDetail: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(addEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      console.log(action?.payload, "action_add");
      state.loading = false;
      toast.success(action?.payload?.data?.message);
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message);
    });


    builder.addCase(updateEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      console.log(action?.payload, "action_update");
      state.loading = false;
      toast.success(action?.payload?.data?.message);
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message);
    });
  },
});

export default EmployeeSlice.reducer;

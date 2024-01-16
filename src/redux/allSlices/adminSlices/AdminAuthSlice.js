import { createSlice } from "@reduxjs/toolkit";
import { AdminResetPassword, forgotPassword, loginAdmin, verifyOtp } from "../../authService";
import { toast } from "react-toastify";

const AdminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    token: "",
    userDetail: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state, action) => {
    state.loading = true;
    })
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action?.payload?.data?.data?.token;
      toast.success(action?.payload?.data?.message);
      console.log(147, action?.payload?.data?.message);
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message);
    });

    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
      })
      builder.addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload?.data?.data?.token;
        toast.success(action?.payload?.data?.message);
        // console.log(147, action?.payload?.data?.message);
      });
      builder.addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        toast.error(action?.payload?.message);
      });

      builder.addCase(verifyOtp.pending, (state, action) => {
        state.loading = true;
        })
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
          state.loading = false;
          toast.success(action?.payload?.data?.message);
          console.log(147, action?.payload?.data?.user?._id);
        });
        builder.addCase(verifyOtp.rejected, (state, action) => {
          state.loading = false;
          toast.error(action?.payload?.message);
        });

        builder.addCase(AdminResetPassword.pending, (state, action) => {
          state.loading = true;
          })
          builder.addCase(AdminResetPassword.fulfilled, (state, action) => {
            state.loading = false;
            toast.success(action?.payload?.data?.message);
            console.log(147, action?.payload);
          });
          builder.addCase(AdminResetPassword.rejected, (state, action) => {
            state.loading = false;
            toast.error(action?.payload?.message);
          });
        
      
    // builder.addCase(forgotPassword.pending)
  },
});

export default AdminAuthSlice.reducer;

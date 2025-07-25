"use client";

import React from "react";
import {Box,Button,FormControl,FormHelperText,InputAdornment,InputLabel,OutlinedInput,Paper,Typography} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setLoading, setToken } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
 import {Helmet} from "react-helmet";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, token } = useSelector((state) => state.authReducer);

  const headers = { token };

  const validationSchema = yup.object({
    password: yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(8, "At least 8 characters")
      .max(20, "Max 20 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
        "Include upper/lowercase, number & special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.patch(
          "https://linked-posts.routemisr.com/users/change-password",
          values,
          {
            headers,
          }
        );
        toast.success("Password updated successfully");
        dispatch(setToken(data.token));
        router.replace("/");
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Incorrect password or error occurred"
        );
        dispatch(setLoading(false));
      }
    },
  });

  return (
 
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 8,
          p: 3,
        }}
      >
             <Helmet>
                <meta charSet="utf-8" />
                <title>New password</title>
             </Helmet>
 
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
            Change Your Password
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <FormControl
              fullWidth
              margin="normal"
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel>Current Password</InputLabel>
              <OutlinedInput
                type="password"
                name="password"
                label="Current Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              margin="normal"
              error={
                formik.touched.newPassword &&
                Boolean(formik.errors.newPassword)
              }
            >
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                type="password"
                name="newPassword"
                label="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <VisibilityOff color="disabled" />
                  </InputAdornment>
                }
              />
              <FormHelperText>
                {formik.touched.newPassword && formik.errors.newPassword}
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Paper>
      </Box>
     
  );
}

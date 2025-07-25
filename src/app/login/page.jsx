"use client";

import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  FormHelperText,
  FormControl,
  InputLabel,
  Button,
  OutlinedInput,
  Typography,
  IconButton,
  InputAdornment,
  Paper
} from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setLoading, setToken } from "@/redux/authSlice";
import { UserContext } from "@/context/page";
 
export default function Login() {
  const { loading } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const { refreshUserProfile } = useContext(UserContext);  

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .min(4, "Min 4 characters")
      .max(60, "Max 60 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Min 8 characters")
      .max(20, "Max 20 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
        "Must include upper/lower case, number & symbol"
      ),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.post(
          "https://linked-posts.routemisr.com/users/signin",
          values
        );
        toast.success(data.message || "Login successful");
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        refreshUserProfile(data.token); //  update data
        router.replace("/allPosts");
      } catch (err) {
        const errorMessage =
          err?.response?.data?.error || "Login failed. Please try again.";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
        px: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "100%", sm: "80%", md: "50%", lg: "35%" },
          p: 4,
          borderRadius: 3,
          bgcolor: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1} color="primary">
          Welcome Back
        </Typography>
        <Typography variant="body2" mb={4} color="text.secondary">
          Log in to explore posts, interact with users, and share your story.
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* Email */}
          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            <InputLabel>Email Address</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="email"
            />
            <FormHelperText>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
          </FormControl>

          {/* Password */}
          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={!loading && <LoginIcon />}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "16px" }}></i>
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
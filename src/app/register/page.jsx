"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box, Grid, FormHelperText, FormControl, InputLabel,
  Button, OutlinedInput, Typography, RadioGroup,
  Radio, FormControlLabel, Paper, TextField
} from "@mui/material";
import { PersonAdd, HowToReg } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function registerForm(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      toast.success(data.message);
      setLoading(false);
      router.push("/login");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Registration failed");
      setLoading(false);
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required("Name is required").min(3).max(15),
    email: yup.string().required("Email is required").email("Invalid email").max(60),
    password: yup.string().required("Password is required").min(8).max(20)
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/, "Use a strong password like Ziad425@12"),
    rePassword: yup.string().required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: registerForm,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
         display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
             <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
             </Helmet>
 
      <Paper elevation={5} sx={{
        width: { xs: "90%", sm: "80%", md: "55%", lg: "40%" },
        p: 4,
        borderRadius: 3,
        bgcolor: "#fff",
      }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary">
          Create Your Account  
        </Typography>
        <Typography variant="body2" textAlign="center" mt={1} mb={3} color="text.secondary">
          Join now and start posting your thoughts, photos, and stories.
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* Name */}
          <FormControl fullWidth margin="normal" error={formik.touched.name && Boolean(formik.errors.name)}>
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.name && formik.errors.name}</FormHelperText>
          </FormControl>

          {/* Email */}
          <FormControl fullWidth margin="normal" error={formik.touched.email && Boolean(formik.errors.email)}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
          </FormControl>

          {/* Password */}
          <FormControl fullWidth margin="normal" error={formik.touched.password && Boolean(formik.errors.password)}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
          </FormControl>

          {/* RePassword */}
          <FormControl fullWidth margin="normal" error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              id="rePassword"
              name="rePassword"
              label="Confirm Password"
              type="password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.rePassword && formik.errors.rePassword}</FormHelperText>
          </FormControl>

          {/* Birth Date */}
          <TextField
            fullWidth
            margin="normal"
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />

          {/* Gender */}
          <FormControl sx={{ mt: 2 }} error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
          </FormControl>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={!loading && <PersonAdd />}
            sx={{
              mt: 3,
              fontWeight: "bold",
              fontSize: "1rem",
              py: 1.5,
              textTransform: "none",
            }}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "17px" }}></i>
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
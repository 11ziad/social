"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Grid, TextField, FormHelperText, FormControl, InputLabel ,Button,OutlinedInput,RadioGroup ,Radio,FormControlLabel } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast'
 import { useRouter } from 'next/navigation'; // ← Next.js Router

export default function Register() {
const [loder, setLoder] = useState(false)
  const router = useRouter(); // ← استخدم router بدل navigate
  async function registerForm(value) {
    // console.log(value.name);
    setLoder(true);
    try {
      let { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        value
      );
      toast.success(data.message);
      console.log(data);
      setLoder(false);
            router.push('/login');
    } catch (err) {
      toast.error(err?.response?.data?.error, {
        autoClose: 4000,
      });
      setLoder(false);
    }
  }
     

  const validationSchema = yup.object({
    name : yup.string().required('name is required').min(3, ' min 3 characters').max(15, ' max 15 characters'),
    email : yup.string().required('email is required').email('invalid email').min(4, ' min 3 characters').max(60, ' max 15 characters'),
    password : yup.string().required('password is required').min(4, ' min 3 characters').max(20, ' max 20 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'inter true password like Ziad425@12'),
    rePassword : yup.string().required('rePassword is required').min(4,' min 3 characters').max(20, ' max 20 characters').oneOf([yup.ref('password')],'no match with password'),
    dateOfBirth : yup.string().required('dateOfBirth is required').min(4,' min 3 characters').max(20, ' max 20 characters'),
    gender : yup.string().required('gender is required'),
    gender : yup.string().required('gender is required'),

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth : '',
      gender : '',
    },
    validationSchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, md: {px: 4},mt:10}}>
      <Grid container spacing={4} sx={{ background:'#EEE', width: {xs: '90%',md: '70%',lg:'40%'},padding:{xs : '20px', md:'20px'}, borderRadius: '8px', mt: 20,display: 'flex' , justifyContent:'center', flexWrap: 'wrap',alignItems:'center', margin: 'auto'}} >
        
        {/* name input - 50% */}
        <Grid item xs={6}sx={{width :'100%'}}  >
          <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
            <InputLabel htmlFor="name">name</InputLabel>
            <OutlinedInput 
              id="name"
              name="name"
               label="name" 
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.name && formik.errors.name}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Password input - 50% */}
        <Grid item xs={6} sx={{width :'100%'}} >
          <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
            <InputLabel htmlFor="email">email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
               label="Email" 
               value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
          </FormControl>
        </Grid>
  

        {/* Password input - 50% */}
        <Grid item xs={6} sx={{width :'100%'}} >
          <FormControl fullWidth error={formik.touched.password && Boolean(formik.errors.password)}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type="password"
               label="password" 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
          </FormControl>
        </Grid>
        {/* rePassword input - 50% */}
        <Grid item xs={6} sx={{width :'100%'}} >
          <FormControl fullWidth error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}>
            <InputLabel htmlFor="rePassword">rePassword</InputLabel>
            <OutlinedInput
              id="rePassword"
              name="rePassword"
              type="password"
               label="rePassword" 
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormHelperText>{formik.touched.rePassword && formik.errors.rePassword}</FormHelperText>
          </FormControl>
        </Grid>

        {/* birthDate */}
          <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            id="dateOfBirth"
            name="dateOfBirth"
            label="dateOfBirth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          />
        </Grid>
          <Grid item xs={6} sx={{ width: '100%' }}>
          <FormControl
            component="fieldset"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <RadioGroup
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              row 
            >
              <FormControlLabel value="female"  name="gender" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
          </FormControl>
        </Grid>
        <Button type='submit' variant="contained" sx={{width:'100%', paddingTop :'9px'}}>
          {loder ===false? <span>Login</span> :<i className="fa-solid fa-spinner fa-spin" style={{fontSize : '17px'}}></i>
          }
          </Button>


      </Grid>
    </Box>
  );
}

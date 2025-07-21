"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Grid, FormHelperText, FormControl, InputLabel ,Button,OutlinedInput,RadioGroup ,Radio,FormControlLabel, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
 import { useRouter } from 'next/navigation'; // ← Next.js Router
import { setLoading, setToken } from '@/redux/authSlice';

export default function Login() {
  let {loading} = useSelector((store)=>store.authReducer)


  
  const router = useRouter(); 
  let dispatch = useDispatch()
  async function registerForm(value) {
     dispatch(setLoading(true))
    try {
      let { data } = await axios.post("https://linked-posts.routemisr.com/users/signin",value);
      toast.success(data.message);
      console.log(data);
       dispatch(setToken(data))
        dispatch(setLoading(false))
        //  router.push('/allPosts');
              router.replace('/allPosts');

    } catch (err) {
      toast.error(err?.response?.data?.error, {
        autoClose: 4000,
      });
     dispatch(setLoading(false))
    }
  }
     

  const validationSchema = yup.object({
     email : yup.string().required('email is required').email('invalid email').min(4, ' min 3 characters').max(60, ' max 15 characters'),
    password : yup.string().required('password is required').min(4, ' min 3 characters').max(20, ' max 20 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'The password is incorrect.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, md: {px: 4},mt:20}}>
      <Grid container spacing={4} sx={{ background:'#EEE', width: {xs: '90%',md: '70%',lg:'40%'},padding:{xs : '20px', md:'20px'}, borderRadius: '8px', mt: 20,display: 'flex' , justifyContent:'center', flexWrap: 'wrap',alignItems:'center', margin: 'auto'}} >
        <Typography sx={{color : 'blue'}}> welcom if you don't have account please create new account and come login to enter .
</Typography>
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
        <Button type='submit' variant="contained" sx={{width:'100%', paddingTop :'9px'}}>
          {loading ===false? <span>Login</span> :<i className="fa-solid fa-spinner fa-spin" style={{fontSize : '17px'}}></i>
          }
          </Button>


      </Grid>
    </Box>
  );
}

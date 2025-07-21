 "use client"

const { createSlice } = require("@reduxjs/toolkit");

export let initialState ={ 
     loading : false,
 token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

         err : false

}
  

 let authSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setLoading :(state , action)=>{
                state.loading = action.payload
        },
 setToken :(state,action)=>{
            state.token = action.payload
            state.loading = false
            localStorage.setItem('token' , action.payload.token)
        },
         setError :(state,action)=>{
            state.loading = false
            state.err =action.payload
        }, 
        removToken :(state)=>{
            state.token  = null
            localStorage.removeItem('token')
        },
    }
})

export let authReducer = authSlice.reducer
export let {setLoading, setToken,setError,removToken} = authSlice.actions
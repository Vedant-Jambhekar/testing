import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'
import toast from 'react-hot-toast'


const initialState = {
    value: {
        first_name: 'Akash',
        last_name: 'Shukla',
        email: 'shuklaakash748972@gmail.com',
    }
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
    console.log(token)
    const { data } = await api.get('/api/user/data', {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data.success ? data.user : null
})

export const updateUser = createAsyncThunk('user/update', async ({userData ,token}) => {
    const { data } = await api.post('/api/user/update', userData, {
        headers: {Authorization: `Bearer ${token}`}
    })
    if(data.success){
        toast.success(data.message)
        return data.user
    }else{
        toast.error(data.message)
        return null
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.value = action.payload
        }).addCase(updateUser.fulfilled, (state, action)=>{
            state.value = action.payload
        })
    }
})

export default userSlice.reducer
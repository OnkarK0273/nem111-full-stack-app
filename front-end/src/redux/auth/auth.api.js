import axios from 'axios'


export const signAPI =async (payload)=>{
    const res = await axios.post(`http://localhost:4500/auth/sign`,payload)
    return res.data
}

export const loginAPI =async (payload)=>{
    const res = await axios.post(`http://localhost:4500/auth/login`,payload)
    return res.data
}
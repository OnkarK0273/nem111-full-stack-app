import axios from 'axios'


export const signAPI =async (payload)=>{
    const res = await axios.post(`https://enthusiastic-crow-beanie.cyclic.app/auth/sign`,payload)
    return res.data
}

export const loginAPI =async (payload)=>{
    const res = await axios.post(`https://enthusiastic-crow-beanie.cyclic.app/auth/login`,payload)
    return res.data
}
import axios from 'axios'


export const notesAPI =async (headers)=>{
    const res = await axios.get(`https://enthusiastic-crow-beanie.cyclic.app/notes`,{headers})
    return res.data
}

export const addAPI =async (payload,headers)=>{
    const res = await axios.post(`https://enthusiastic-crow-beanie.cyclic.app/notes/add`,payload,{headers})
    return res.data
}

export const deleteAPI =async (id,headers)=>{
    const res = await axios.delete(`https://enthusiastic-crow-beanie.cyclic.app/notes/delete/${id}`,{headers})
    return res.data
}

export const patcheAPI =async (payload,id,headers)=>{
    const res = await axios.patch(`https://enthusiastic-crow-beanie.cyclic.app/notes/edit/${id}`,payload,{headers})
    return res.data
}
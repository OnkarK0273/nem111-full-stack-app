import axios from 'axios'


export const notesAPI =async (headers)=>{
    const res = await axios.get(`http://localhost:4500/notes`,{headers})
    return res.data
}

export const addAPI =async (payload,headers)=>{
    const res = await axios.post(`http://localhost:4500/notes/add`,payload,{headers})
    return res.data
}

export const deleteAPI =async (id,headers)=>{
    const res = await axios.delete(`http://localhost:4500/notes/delete/${id}`,{headers})
    return res.data
}

export const patcheAPI =async (payload,id,headers)=>{
    const res = await axios.patch(`http://localhost:4500/notes/edit/${id}`,payload,{headers})
    return res.data
}
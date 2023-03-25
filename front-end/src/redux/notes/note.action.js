import { addAPI, deleteAPI, notesAPI, patcheAPI } from './note.api'
import * as types from './note.type'

export const getNotes = (headers) =>async (dispatch)=>{

    try{
        dispatch({type:types.LOADING})
        let res = await notesAPI(headers)
        dispatch({type:types.NOTES,payload:res.notes})

    }catch(err){
        dispatch({type:types.ERROR})
    }

}

export const addNotes = (payload,headers) =>async (dispatch)=>{

    try{
        dispatch({type:types.LOADING})
         await addAPI(payload,headers)
        console.log(payload)
        dispatch({type:types.ADD_NOTES,payload:payload})

    }catch(err){
        dispatch({type:types.ERROR})
    }

}

export const deleteNotes = (id,headers) =>async (dispatch)=>{

    try{
        dispatch({type:types.LOADING})
        await deleteAPI(id,headers)
        dispatch({type:types.DELETE_NOTE,payload:id})

    }catch(err){
        dispatch({type:types.ERROR})
    }

}

export const patchNotes = (body,id,headers) =>async (dispatch)=>{

    try{
        dispatch({type:types.LOADING})
        await patcheAPI(body,id,headers)
        dispatch({type:types.PATCH_NOTE,payload:{body,id}})

    }catch(err){
        dispatch({type:types.ERROR})
    }

}


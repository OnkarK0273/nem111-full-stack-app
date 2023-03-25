import * as types from './note.type'



const init = {
   loading:false,
   NoteError:false,
   notes:[],
   isAdd:false,
   isDelete:false,
   isPatch :false
}


export default function noteReducer(state = init,{type,payload}){

    switch(type){

        case types.ERROR:{
            return {...state, NoteError:true,loading:false,isAdd:false,isDelete:false,isPatch:false}
        }
        case types.LOADING:{
            return {...state,NoteError:false,loading:true,isAdd:false,isDelete:false,isPatch:false}
        }

        case types.NOTES:{
            
            return {...state, NoteError:false,loading:false,notes:payload}
        }

        case types.ADD_NOTES:{
           
            return {...state,NoteError:false,loading:false,notes:[...state.notes,payload],isAdd:true}
        }

        case types.DELETE_NOTE:{
            const arr = state.notes.filter((el)=>el._id !== payload)
            return {...state, NoteError:false,loading:false,notes:arr, isDelete:true}
        }


        case types.PATCH_NOTE:{
            const arr1 = state.notes.map((el)=>{
                if(el._id === payload.id){
                    el.title = payload.body.title
                    el.sub = payload.body.sub
                    el.body = payload.body.body
                }
                return el
            })
            return {...state, NoteError:false,loading:false,notes:arr1,isPatch:true}
        }

        case types.RESET_NOTES:{
            return{...state,NoteError:false,loading:false,notes:[],isAdd:false,isDelete:false,isPatch:false}
        }

        default: return state
    }


}
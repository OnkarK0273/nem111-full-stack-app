import * as types from './auth.type'

 const user = sessionStorage.getItem('user')
 const token = sessionStorage.getItem('token')
// const user2 = user.user

const init = {
    token:token || '',
    error:null,
    isSign:false,
    isLogin:token?true:false  ,
    user:  user || ''
}


export default function authReducer(state = init,{type,payload}){

    switch(type){

        case types.ERROR:{
            return {...state, error:payload}
        }
        case types.SIGNUP:{
            return {...state,isSign:true,error:null}
        }

        case types.LOGIN:{
            sessionStorage.setItem("token",payload.token)
            sessionStorage.setItem("user",payload.user.email)
            return{...state,isLogin:true,token:payload.token,user:payload.user.email,error:null}
        }

        case types.RESET_AUTH:{
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            return {...state,isLogin:false,isSign:false,token:null,user:null}
        }

        

        default: return state
    }


}
import {legacy_createStore,combineReducers,compose,applyMiddleware} from 'redux'
import authReducer from './auth/auth.reducer'
import noteReducer from './notes/note.reducer'
import thunk from 'redux-thunk'
const root = combineReducers({
    authReducer,
    noteReducer
})

const compseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(root,compseEnhancer(applyMiddleware(thunk)))
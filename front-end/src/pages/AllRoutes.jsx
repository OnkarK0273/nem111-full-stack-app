import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Log from './Log'
import Sign from './Sign'
export default function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/log' element={<Log/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/*' element={<h1>Page Not Found</h1>}/>
    </Routes>
  )
}

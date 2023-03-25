import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotes, getNotes } from '../redux/notes/note.action'
export default function Carditem({data,handleDetails}) {
  const [id,setId] = useState('')
  const {token} = useSelector((store)=>store.authReducer)
  const { NoteError,isDelete}= useSelector((store)=>store.noteReducer)
  const dispatch = useDispatch()
  const toast = useToast()
  
 
  const handleDelete = ()=>{
    const headers = {
      'Content-Type': 'application/json',
      token:token // replace token with your actual token value
    }
    dispatch(deleteNotes(id,headers)).then(()=>{
      dispatch(getNotes(headers))
    })
  }

  useEffect(()=>{
   
    
    setId(data._id)

  },[isDelete,handleDelete])

  return (
    <div>
        <Card bg='#B2F5EA' >
            <CardHeader>
            <Heading size='md'>{data.title}</Heading>
            </CardHeader>
            <CardBody rowGap={'5px'}>
            <Text textAlign={'left'} color='orange.400' fontSize={'md'} fontWeight={'semibold'} >{data.sub}</Text>
            <Text  textAlign={'left'} color={'gray.500'} >{data.body}</Text>
            </CardBody>
            <CardFooter justifyContent={'space-between'} >
            <Button bg='blue.300' onClick={()=>{handleDetails(data.title,data.sub,data.body,data._id)}} >Edit</Button>
            <Button bg='red.300' onClick={handleDelete} >Delete</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes, patchNotes } from '../redux/notes/note.action'
import Carditem from './Carditem'

export default function Cards({data}) {
    const [title,setTitle] = useState('')
    const [sub,setSub] = useState('')
    const [body,setBody] = useState('')
    const [id,setId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {token} = useSelector((store)=>store.authReducer)
  const { isPatch}= useSelector((store)=>store.noteReducer)
  const dispatch = useDispatch()
  const toast = useToast()

    const handleDetails = (title,sub,body,id)=>{

        setTitle(title)
        setSub(sub)
        setBody(body)
        setId(id)
        onOpen()

    }

    const handleSubmit = ()=>{

        
        const payload={
            title,
            body,
            sub
          }

          const headers = {
            'Content-Type': 'application/json',
            token:token // replace token with your actual token value
          }
          dispatch(patchNotes(payload,id,headers)).then(()=>{
            dispatch(getNotes(headers))
          })

          onClose()

    }

    useEffect(()=>{
   
        if(isPatch){
          toast({
            title: 'Note Edited Sucessfully',
           
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          
        }
    
        setId(data._id)
    
      },[isPatch])


  return (
    <Box>
        {/* grid */}
        <SimpleGrid p='10px' spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
            {
                data.map((el)=>(<Carditem key={el._id} data={el} handleDetails={handleDetails} />))
            }
        </SimpleGrid>
        {/* modal */}
        <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px"/>
        <ModalContent bg='#B2F5EA' color={"black"}>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} textAlign={"center"}>
           
            <Box textAlign={"left"}>
              
              <Text mt={"10px"}>Title </Text>
              <Input
                 borderColor='teal.500'
                cursor={"pointer"}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                 
                }}
              >
                {/* Title- {modalDetail.product_title} */}
              </Input>
              <Text mt={"10px"}>Subject </Text>
              <Input
                 borderColor='teal.500'
                cursor={"pointer"}
                value={sub}
                onChange={(e) => {
                  setSub(e.target.value);
                 
                }}
              >
                {/* Price- Rs {Math.floor(Number(modalDetail.product_price) * 60)} */}
              </Input>
              <Text mt={"10px"}>Body</Text>
              <Textarea
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                     
                    }}
                    borderColor='teal.500'
                    
                    size='sm'
                />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="blue.500"
              mr={3}
              onClick={handleSubmit}
            >
              Edit
            </Button>
            <Button colorScheme={"red"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </Box>
  )
}

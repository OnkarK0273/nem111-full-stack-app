import React, { useEffect, useState } from 'react'
import styles from './arrow.css'
import {  Avatar,
    Box,
    Button,
    Container,
    Heading,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    useDisclosure,
    useToast, } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addNotes } from '../redux/notes/note.action';
export default function AddNotes() {
  const [title,setTitle] = useState('')
  const [sub,setSub] = useState('')
  const [body,setBody] = useState('')
  const {token} = useSelector((store)=>store.authReducer)
  const { NoteError,isAdd}= useSelector((store)=>store.noteReducer)
  const dispatch = useDispatch()
  const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => {
        // handle click event
        onOpen()
      };


      const handleSubmit=()=>{

        const payload={
          title,
          body,
          sub
        }

        const headers = {
          'Content-Type': 'application/json',
          token:token // replace token with your actual token value
        }
        dispatch(addNotes(payload,headers)).then(()=>{
          setTitle('')
          setBody('')
          setSub('')
        })

      }

      useEffect(()=>{
        if(NoteError){
          toast({
            title: "Something Wents Wrong",
            status: 'error',
            duration: 1000,
            isClosable: true,
          })
        }
        if(isAdd){
          toast({
            title: 'Note Added Sucessfully',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          
        }


      },[NoteError,isAdd])

    
      return (
        <Box
          position="fixed"
          bottom="120"
          right="120"
         
        >
          <IconButton
            aria-label="Add"
            bg='teal.400'
            icon={<FaPlus />}
           
            boxSize={'70'}
            onClick={handleClick}
          >
            
         
         </IconButton>
         {/* modal */}
        <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px"/>
        <ModalContent bg='#B2F5EA' color={"black"}>
          <ModalHeader>Add Note</ModalHeader>
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
              bg="teal.500"
              mr={3}
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Save
            </Button>
            <Button colorScheme={"red"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
         
        </Box>
      );
}

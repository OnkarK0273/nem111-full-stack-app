import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Select,
  Text,
  useColorModeValue,
  Link,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Signin } from '../redux/auth/auth.action';
import { useNavigate } from 'react-router-dom';


export default function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [name,setname] = useState('')
  const [age,setage] = useState(0)
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [pass2,setPass2] = useState('')
  const dispatch = useDispatch()
  const {error,isSign} = useSelector((store)=>store.authReducer)
  const navigate = useNavigate();
  const toast = useToast()

  const flag = ((pass.length>0 && pass2.length>0 ) && (pass === pass2))

  const onsubmit = ()=>{
    const payload ={
      name,
      age,
      email,
      pass
    
    }

    dispatch(Signin(payload))
    

  }

  useEffect(()=>{
    if(error){
      toast({
        title: error,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
    if(isSign){
      toast({
        title: 'Account Created Sucessfully',
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      navigate('/log')
    }

  },[error,isSign])



  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundImage="url('https://images.unsplash.com/photo-1630412500200-728764552dc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')"
      backgroundSize="cover"
      
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading bg='white' p='10px' color={'teal'} fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
    
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input type="number" value={age} onChange={(e)=>{setage(e.target.value)}} />
                </FormControl>
              </Box>
            </HStack>
           
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="con_password" isRequired>
              <FormLabel>confirm password </FormLabel>
              <InputGroup>
                <Input type={showPassword1 ? 'text' : 'password'} value={pass2}  onChange={(e)=>{setPass2(e.target.value)}}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword1((showPassword1) => !showPassword1)
                    }>
                    {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={onsubmit}
                isDisabled={!flag}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
           
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

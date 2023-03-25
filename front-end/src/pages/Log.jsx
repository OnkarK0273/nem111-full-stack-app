import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link as Navlink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { Login } from '../redux/auth/auth.action';


export default function Log() {
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const toast = useToast()
  const navigate = useNavigate();
  const {error,isLogin} = useSelector((store)=>store.authReducer)
  const dispatch = useDispatch()
  
  const onsubmit = ()=>{
    const payload ={
      email,
      pass
    }

    dispatch(Login(payload))
    
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
    if(isLogin){
      toast({
        title: 'Login Sucessfull.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      navigate('/')
    }

  },[error,isLogin])



  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundImage="url('https://images.unsplash.com/photo-1630412500200-728764552dc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')"
      backgroundSize="cover"
      height="100vh"
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={18} px={6} >
        <Stack align={'center'}>
          <Heading bg='white' p='10px' color={'teal'} fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                >
                <Text>Create New Account</Text>
                <Navlink to={'/sign'} color={'blue.400'}>SignUp</Navlink>
              </Stack>
              <Button
              onClick={onsubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
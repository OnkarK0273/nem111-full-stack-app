import { Box, Card, Heading, Highlight, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddNotes from '../components/AddNotes'
import Carditem from '../components/Carditem'
import Cards from '../components/Cards'
import Welcome from '../components/Welcome'
import { getNotes } from '../redux/notes/note.action'

export default function Home() {
  const {isLogin,token} = useSelector((store)=>store.authReducer)
  const {notes}= useSelector((store)=>store.noteReducer)
  const dispatch = useDispatch()
  const toast = useToast()
  console.log(notes)

useEffect(()=>{
  const headers = {
    
  'Content-Type': 'application/json',
  token:token // replace token with your actual token value // replace token with your actual token value
  }

  dispatch(getNotes(headers))

},[])

  return (
    <div>
      {
        isLogin?<Box>
          
        {
          notes.length>0&& <Cards data={notes} />
        }
        

      {
        notes.length ===0 && <Heading lineHeight='tall' mt='60' >
        <Highlight
          query={['NOTES']}
          styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
        >
          ADD NOTES
        </Highlight>
      </Heading>
      }
      <AddNotes/>
        </Box>:<Box>
          < Welcome/>
        </Box>
      }
     
    </div>
  )
}

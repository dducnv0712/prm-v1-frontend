import React,{useState,useEffect} from 'react'
import { useMediaQuery } from 'react-responsive'
import { Button, Box, Modal } from '@mui/material';
function imageLoader({ src }) {
  return `/images/${src}`; // REPLACE WITH YOUR IMAGE DIRECTORY
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '90%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#ffff',
  border: '2px solid #e11d48',
  borderRadius: 4,
  pt: 2,
  px: 4,
  pb: 3,
  zIndex: 1,

};
const ModalComponent = (props) => {
  const [width, setWidth] = useState(null)
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  useEffect(() => {
    if(isDesktopOrLaptop){
      setWidth('40%')
    }else if(isTabletOrMobile){
      setWidth('100%')
    }
  },[isDesktopOrLaptop,isBigScreen,isTabletOrMobile,isPortrait,isRetina])
  return (
    <Modal
    open={props.isOpen}
    aria-labelledby="parent-modal-title hello"
    aria-describedby="parent-modal-description"
>
    <Box className="border-2 relative transition duration-700 ease-in-out border-rose-600" sx={{ ...style,width:width}}>
        {props.children}
    </Box>
</Modal>
  )
}

export default ModalComponent
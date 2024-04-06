import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'
import Productsdisplay from '../Pages/Productsdisplay'
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const token = useSelector((store) => store.AuthReducer.token);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Box>
        <NavBar/>
        <Box>
          <Productsdisplay/>
        </Box>
        { isAuth&& isModalOpen && <ManualClose onClose={closeModal} />}
    </Box>
  )
}

export default Homepage

function ManualClose({ onClose }) {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms & Conditions</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
        For any online business which sells goods or services, a strong Terms and Conditions (T&C) agreement is just as important as choosing your site theme. However, T&C documents are often met with confusion by both businesses and consumers alike. Knowing what to include and how to approach writing them can be an intimidating prospect.
        </ModalBody>
        <ModalFooter >
        <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Accept
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

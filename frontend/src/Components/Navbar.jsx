import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  Image,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../Redux/Auth/action';
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';

const IconButton = ({ children }) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: '#f6f6f6' }}
    >
      {children}
    </Button>
  );
};

const NavBar = () => {
  const token = useSelector((store) => store.AuthReducer.token);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear()
  };

  const [cartItemCount, setCartItemCount] = useState(0);



  useEffect(() => {
  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
   
    const itemCount = cartItems.length;
  
    setCartItemCount(itemCount);
  }, [localStorage.getItem('cartItems')]);

  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg={useColorModeValue('gray.100', 'gray.700')}
      width="100%"
      zIndex="1"
    >
      <Container maxW="1280px" px={4} mx="auto">
        <HStack spacing={4}>
          <Link to="/productdisplay">
            <Image
              alt="dev logo"
              w={'auto'}
              h={12}
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            />
          </Link>
          <Spacer />
          <HStack spacing={3}>
            <Box mt={"10px"} justifyContent={"center"} alignItems={"center"} pr={"20px"}>
              <Link to="/cart" style={{ textDecoration: 'none', position: 'relative', display: 'inline-block' }}>
                <Box position="absolute" top="-1rem" right="-1rem" bg="green" borderRadius="full" w="1.5rem" h="1.5rem" textAlign="center">
                  <Text fontSize="sm" fontWeight="bold" color="white">{cartItemCount}</Text>
                </Box>
                <Box w="25%">
                  <FaShoppingCart />
                </Box>
              </Link>
            </Box>
            <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar size="sm" src={''} />
              </MenuButton>
              <MenuList zIndex={5} border="2px solid" borderColor={useColorModeValue('gray.700', 'gray.100')} boxShadow="4px 4px 0">
                <MenuItem>
                  <Text fontWeight="500"><Link to="/mystore">My Store</Link></Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500"><Link to="/profilepage">Profile</Link></Text>
                </MenuItem>
                {token ? (
                  <MenuItem>
                    <Text fontWeight="500">
                      <Button onClick={handleLogout}>Logout</Button>
                    </Text>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Text fontWeight="500">
                      <Link to="/signup">Sign Up</Link>
                    </Text>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;

import React from 'react';
import { SimpleGrid, Box, Image, Text, Button, HStack } from '@chakra-ui/react';
import NavBar from '../Components/Navbar';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const handleIncrement = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        // You may need to force a re-render here if the state is not updated automatically
    };

    const handleDecrement = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        // You may need to force a re-render here if the state is not updated automatically
    };

    const handleRemove = (id) => {
        const index = cartItems.findIndex(item => item._id === id);
        if (index !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            alert("Product removed");
            // You may need to force a re-render here if the state is not updated automatically
        } else {
            alert("Product not found in cart");
        }
    };
    

    return (
        <>
            <NavBar />
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mt={"5%"} >
                {cartItems.map((item) => (
                    <Box key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Image src={item.image} alt="" h="200px" w="100%" objectFit="cover" />
                        <Box p="6">
                            <Text fontWeight="semibold" fontSize="lg" lineHeight="tight" isTruncated>
                                {item.title}
                            </Text>
                            <Text fontWeight="semibold" fontSize="md" lineHeight="tight" isTruncated>
                                {item.description}
                            </Text>
                            <Text color="gray.500" fontSize="lg">
                                Rs. {item.price}
                            </Text>
                            <Button onClick={() => handleRemove(item._id)}>Remove</Button>
                            <HStack  justifyContent={"space-between"} align={"center"} mt={"3%"} border={"1px solid blue"}>
                            <Button onClick={() => handleDecrement(item._id)}>-</Button>
                            <Text fontSize="md"> {item.quantity}</Text>
                            <Button onClick={() => handleIncrement(item._id)}>+</Button>
                            </HStack>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
           {cartItems.length>0?
           <Box mt={5} display="flex" justifyContent="flex-end">
           <Button
             w="10%"
             color={"white"}
             bgColor={"#3cd9ee"}
           
             textAlign={"right"}
           ><Link to={"/"}>Check out <ArrowRightIcon /></Link>
             
           </Button>
           </Box>:<Text textAlign={"center"} size={"lg"}  fontWeight={"bold"} color={"#3cd9ee"}>Cart is empty!</Text>

           } 
        </>
    );
};

export default CartPage;

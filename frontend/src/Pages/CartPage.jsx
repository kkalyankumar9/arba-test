import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Image, Text, Button, HStack, Center } from '@chakra-ui/react';
import NavBar from '../Components/Navbar';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const handleIncrement = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
    };

    const handleDecrement = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
    };

    const handleRemove = (id) => {
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
    };

    const updateLocalStorage = (items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    };
   

    return (
        <>
            <NavBar />
            {cartItems.length > 0 ? (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8} mt={"5%"} mx={{ base: "5%", md: "10%", lg: "15%" }}>
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
                                <HStack bgColor={"teal"} justifyContent={"space-between"} align={"center"} mt={"3%"} color={"white"} fontWeight={"bold"}>
                                    <Button bgColor={"teal"} color={"white"} onClick={() => handleDecrement(item._id)}>-</Button>
                                    <Text fontSize="md"> {item.quantity}</Text>
                                    <Button  bgColor={"teal"} color={"white"} onClick={() => handleIncrement(item._id)}>+</Button>
                                </HStack>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <Center h="50vh">
                    <Text textAlign={"center"} fontSize={"lg"} fontWeight={"bold"} color={"#3cd9ee"}>
                        Cart is empty!
                    </Text>
                </Center>
            )}
            {cartItems.length > 0 && (
                <Box mt={5} display="flex" justifyContent="flex-end" mx={{ base: "5%", md: "10%", lg: "15%" }}>
                    <Button
                        w="20%"
                        color={"white"}
                        bgColor={"#3cd9ee"}
                        textAlign={"right"}
                    
                    >
                        <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            Check out <ArrowRightIcon ml={2} />
                        </Link>
                    </Button>
                </Box>
            )}
        </>
    );
};

export default CartPage;

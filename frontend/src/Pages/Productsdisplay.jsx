import React, { useEffect } from 'react';
import { Box, SimpleGrid, Image, Text, Button, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/Navbar';
import { getProductdata } from '../Redux/Products/action';

const Productsdisplay = () => {
    const productsData = useSelector((store) => store.ProductsReducer.productsData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductdata());
    }, [dispatch]);

    const handleAddtoCart = (id, data) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item._id === id);

        if (existingItemIndex !== -1) {
            // If item already exists in cart, show alert
            window.alert("This item is already in your cart!");
        } else {
            // If item does not exist in cart, add it with quantity 1
            cartItems.push({ ...data, quantity: 1 });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.alert("Added to cart!");
        }
    };

    return (
        <>
            <NavBar />
            <Box mt={10} textAlign="center">
                <Heading as="h1" fontSize="2xl" mb={5}>Products</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                    {productsData.map((product) => (
                        <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Image src={product.image} alt="" h="200px" w="100%" objectFit="cover" />
                            <Box p={6}>
                                <Text fontWeight="semibold" fontSize="lg" lineHeight="tight" isTruncated>
                                    {product.title}
                                </Text>
                                <Text fontWeight="semibold" fontSize="md" lineHeight="tight" isTruncated>
                                    {product.description}
                                </Text>
                                <Text color="gray.500" fontSize="lg">
                                    Rs. {product.price}
                                </Text>
                            </Box>
                            <Button onClick={() => handleAddtoCart(product._id, product)}>Add to cart</Button>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default Productsdisplay;

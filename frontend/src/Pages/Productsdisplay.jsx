import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Image, Text, Button, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/Navbar';
import { getProductdata } from '../Redux/Products/action';
import {ArrowRightIcon} from '@chakra-ui/icons'

const Productsdisplay = () => {
    const dispatch = useDispatch();
    const productsData = useSelector((store) => store.ProductsReducer.productsData);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        dispatch(getProductdata());
    }, [dispatch]);

    useEffect(() => {
        // Initially display only 8 products
        setDisplayedProducts(productsData.slice(0, 8));
    }, [productsData]);

    const handleShowMore = () => {
        // Display all products when "Show more products" button is clicked
        setDisplayedProducts(productsData);
        setShowAll(true);
    };

   
   

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
            <Box textAlign="center"  p={"2%"} m={"4%"} justifyContent={"center"} alignItems={"center"} >
                <Heading as="h1" fontSize="2xl" mb={5} textAlign={"left"} ml="14%">Products</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} justifyContent={"center"} alignItems={"center"} w={"70%"} m={"auto"}>
                    {displayedProducts.map((product) => (
                        <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" position="relative">
                        <Image src={product.image} alt=""  w="600px" h="200px" />
                        <Box p={6} textAlign={"left"} position="absolute" bottom="10" left="0" right="0" bg="white">
                          <Text fontWeight="semibold" fontSize="lg" lineHeight="tight" isTruncated>
                            {product.title}
                          </Text>
                          <Text fontWeight="semibold" fontSize="md" lineHeight="tight" isTruncated>
                            {product.description}
                          </Text>
                          <Text  fontSize="lg"    color={"#3cd9ee"}>
                            Rs. {product.price}
                          </Text>
                        </Box>
                        <Button mt={"20px"} onClick={() => handleAddtoCart(product._id, product)}  bottom="10px" right="10px"    bgColor={"#3cd9ee"} color={"white"}>Add to cart</Button>
                      </Box>
                      
                    ))}
                </SimpleGrid>
                {!showAll && productsData.length > 8 && (
                   <Box mt={5} display="flex" justifyContent="flex-end">
                   <Button
                     w="10%"
                     color={"white"}
                     bgColor={"#3cd9ee"}
                     onClick={handleShowMore}
                     textAlign={"right"}
                   >
                     All Products <ArrowRightIcon />
                   </Button>
                 </Box>
                 
                  
                )}
                
            </Box>
        </>
    );
};

export default Productsdisplay;

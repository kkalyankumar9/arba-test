import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,

  Image
} from '@chakra-ui/react';
import { deleteProduct, getProductdata } from '../../Redux/Products/action';
import NavBar from '../Navbar';
import {  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
const ProductsTable = () => {


  const productsData = useSelector((store) => store.ProductsReducer.productsData);
  const isLoading = useSelector((store) => store.ProductsReducer.isLoading);
  const isError = useSelector((store) => store.ProductsReducer.isError);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getProductdata());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteProduct(taskId))
      .then(() => {
        toast({
          title: 'Product Deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(getProductdata());
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRefreshClick = () => {
    dispatch(getProductdata());
    };
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

  return (
    <>
      <NavBar />
      <Box textAlign={"left"} ml={"12%"} > 
      <Button onClick={handleRefreshClick}>Refresh</Button>
      
      
      <Button onClick={onOpen}>Filter</Button>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Filter Options
            </AlertDialogHeader>
            <AlertDialogBody>
              <label htmlFor="">Under 500</label>
            <input  type="checkbox" />
            <label htmlFor="">above 500</label>
            <input  type="checkbox" />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Close</Button>
              <Button colorScheme="blue" ml={3}>Apply Filters</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Button><Link to={"/addproduct"}>Add</Link></Button>
      
      </Box>
     
      <Box mx="auto" w="70%" my="4" p="4" borderWidth="1px" borderRadius="lg" mt={'40px'}>
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && <p className="text-center text-red-500">Error fetching data</p>}
        {productsData && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productsData.map((task) => (
                <Tr key={task._id}>
                  <Td>{task.title}</Td>
                  <Td>{task.description}</Td>
                  <Td><Image src={task.image} alt="" h="100px" /></Td>
                  <Td>{task.price}</Td>
                  <Td>
                    <Flex align="center">
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleDelete(task._id)
                        }}
                        disabled={!isAuth}
                      >
                        Delete
                      </Button>
                      <Link to={`/editproduct/${task._id}`}>
                        <Button colorScheme="blue" ml={2} disabled={!isAuth}>
                          Edit
                        </Button>
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    
  
    </>
  );
};

export default ProductsTable;

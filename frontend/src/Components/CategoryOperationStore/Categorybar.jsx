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
import { deleteCategory, getCategorydata } from '../../Redux/Category/action';

const CategoryTable = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const categoryData = useSelector((store) => store.ProductsReducer.categoryData);
  const isLoading = useSelector((store) => store.ProductsReducer.isLoading);
  const isError = useSelector((store) => store.ProductsReducer.isError);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();
console.log(categoryData)
  useEffect(() => {
    dispatch(getCategorydata());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteCategory(taskId))
      .then(() => {
        toast({
          title: 'Product Deleted',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(getProductdata());
        setIsDeleteAlertOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <>
      <Button><Link to={"/addcategoy"}>Add</Link></Button>
      <NavBar />
      <Box mx="auto" w="70%" my="4" p="4" borderWidth="1px" borderRadius="lg" mt={'100px'}>
        {isLoading && <p className="text-center">Loading...</p>}
        {isError && <p className="text-center text-red-500">Error fetching data</p>}
        {categoryData && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Slag</Th>
                <Th>Image</Th>
                
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categoryData.map((task) => (
                <Tr key={task._id}>
                  <Td>{task.name}</Td>
                  <Td>{task.slag}</Td>
                  <Td><Image src={task.image} alt="" h="100px" /></Td>
             
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
                      <Link to={`/editcategoy/${task._id}`}>
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

export default CategoryTable;

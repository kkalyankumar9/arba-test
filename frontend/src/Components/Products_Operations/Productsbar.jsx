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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Image
} from '@chakra-ui/react';
import { deleteProduct, getProductdata } from '../../Redux/Products/action';
import NavBar from '../Navbar';

const ProductsTable = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const productsData = useSelector((store) => store.ProductsReducer.productsData);
  const isLoading = useSelector((store) => store.ProductsReducer.isLoading);
  const isError = useSelector((store) => store.ProductsReducer.isError);
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();
  console.log(productsData)

  useEffect(() => {
    dispatch(getProductdata());
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedTask) {
      dispatch(deleteProduct(selectedTask._id))
        .then(() => {
          toast({
            title: 'Task Deleted',
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
    }
  };

  const onCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <NavBar />

      <Box mx="auto" my="4" p="4" borderWidth="1px" borderRadius="lg" mt={'100px'} >
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
              </Tr>
            </Thead>
            <Tbody>
              {productsData.data?.map((task) => (
                <Tr key={task._id}>
                  <Td><Image src={task.description} alt=""/></Td>
                  <Td>{task.title}</Td>
                  <Td>{task.description}</Td>
                  <Td>{task.Price}</Td>
                  <Td>
                    <Flex align="center">
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setSelectedTask(task);
                          setIsDeleteAlertOpen(true);
                        }}
                        disabled={!isAuth}
                      >
                        Delete
                      </Button>
                      <Link to={`/taskedit/${task._id}`}>
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

      {/* Delete Confirmation Alert */}
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={onCloseDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this task?</AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onCloseDeleteAlert}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ProductsTable;

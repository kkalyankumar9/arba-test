import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskdata, updateTask } from '../../Redux/Task/action';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';
import Navbar from '../Navbar';

const EditTask = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  console.log(taskId)
  const taskData = useSelector((store) => store.TaskReducer.taskData);

 
  const [data, setData] = useState({
    title: "",
    description: ""

  });
const toast=useToast()
  useEffect(() => {
    const existingTask = taskData?.find((task) => task._id == taskId);

    console.log(existingTask)
    if (existingTask) {
      setData(existingTask);
    }
  }, [taskId, taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateTask(taskId, data))
      .then(() => {
        alert('Data updated');
        toast({
          title: "Data updated",
          description: "You have successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        dispatch(getTaskdata());
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error updating data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
<Navbar/>
<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <Box shadow="md" w={{ base: "90%", sm: "400px" }} p={8} borderRadius="md">
      <Heading mb={4}>Edit Task</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update Task
        </Button>
      </VStack>
    </Box>
  </Box>
  
    </>
  );
};

export default EditTask;

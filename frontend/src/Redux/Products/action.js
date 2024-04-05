import { ADD_ERROR, ADD_REQUEST, ADD_SUCCESS, DELETE_ERROR, DELETE_REQUEST, DELETE_SUCCESS, GET_ERROR, GET_REQUEST, GET_SUCCESS, UPDATE_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS } from "./actionType";

export const getProductdata = () => async (dispatch) => {
  dispatch({ type: GET_REQUEST });
  try {
    const response = await fetch("https://arba-test.onrender.com/products/get", {
      headers: {
        Authorization: ` ${localStorage.getItem("token")}`, 
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    dispatch({ type: GET_SUCCESS, payload: data }); // Dispatching data instead of response
    console.log(data.data);
  } catch (error) {
    dispatch({ type: GET_ERROR });
    console.error(error);
  }
};

export const createProduct = (newProductData) => async (dispatch) => {
  dispatch({ type: ADD_REQUEST });
  try {
    const response = await fetch("https://arba-test.onrender.com/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProductData),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const data = await response.json();
    dispatch({ type: ADD_SUCCESS, payload: data.data });
    dispatch(getProductdata()); // Fetch updated list of tasks
    console.log(data);
  } catch (error) {
    dispatch({ type: ADD_ERROR });
    console.error(error);
  }
};

export const deleteProduct = (taskId) => async (dispatch) => {
  dispatch({ type: DELETE_REQUEST });
  try {
    const response = await fetch(`https://arba-test.onrender.com/products/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: ` ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    dispatch({ type: DELETE_SUCCESS, payload: taskId });
  } catch (error) {
    dispatch({ type: DELETE_ERROR });
    console.error(error);
  }
};

export const updateProduct = (taskId, updatedProductData) => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  try {
    const response = await fetch(`https://arba-test.onrender.com/products/update/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedProductData),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const data = await response.json();
    dispatch({ type: UPDATE_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: UPDATE_ERROR, payload: error.message || "Update failed" });
    console.error(error);
  }
};

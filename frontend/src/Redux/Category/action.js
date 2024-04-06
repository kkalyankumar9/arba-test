import { ADD_ERROR, ADD_REQUEST, ADD_SUCCESS, DELETE_ERROR, DELETE_REQUEST, DELETE_SUCCESS, GET_ERROR, GET_REQUEST, GET_SUCCESS, UPDATE_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS } from "./actionType";

export const getCategorydata = () => async (dispatch) => {
  dispatch({ type: GET_REQUEST });
  try {
    const response = await fetch("https://arba-test.onrender.com/category/get", {
      headers: {
        Authorization: ` ${localStorage.getItem("token")}`, 
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    dispatch({ type: GET_SUCCESS, payload: data }); // Dispatching data instead of response
    console.log(data);
  } catch (error) {
    dispatch({ type: GET_ERROR });
    console.error(error);
  }
};

export const createCategory= (newCategoryData) => async (dispatch) => {
  dispatch({ type: ADD_REQUEST });
  try {
    const response = await fetch("https://arba-test.onrender.com/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newCategoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to create category");
    }
    const data = await response.json();
    dispatch({ type: ADD_SUCCESS, payload: data.data });
    dispatch(getCategorydata()); // Fetch updated list of tasks
    console.log(data);
  } catch (error) {
    dispatch({ type: ADD_ERROR });
    console.error(error);
  }
};

export const deleteCategory= (taskId) => async (dispatch) => {
  dispatch({ type: DELETE_REQUEST });
  try {
    const response = await fetch(`https://arba-test.onrender.com/category/delete/${taskId}`, {
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

export const updateCategory= (taskId, updatedCategoryData) => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  try {
    const response = await fetch(`https://arba-test.onrender.com/category/update/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedCategoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to update category");
    }
    const data = await response.json();
    dispatch({ type: UPDATE_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: UPDATE_ERROR, payload: error.message || "Update failed" });
    console.error(error);
  }
};

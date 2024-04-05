import { DELETE_ERROR, DELETE_REQUEST, DELETE_SUCCESS, GET_ERROR, GET_REQUEST, GET_SUCCESS, UPDATE_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS } from "./actionType"

const initialState={
  productsData:[],
  cart:[],
  isLoading:false,
  isError:false,

  
}

export  const  productsReducer=(state=initialState,action)=>{
switch(action.type){
  case GET_REQUEST:return{...state,  isLoading:true,
    isError:false}
  case GET_ERROR:return{...state,  isLoading:false,isError:true}
  case GET_SUCCESS:
    
  return{...state,productsData:action.payload,isLoading:false,isError:false}
  case DELETE_REQUEST:
    return { ...state, isLoading: true, isError: false };
  case DELETE_ERROR:
    return { ...state, isLoading: false, isError: true };
  case DELETE_SUCCESS:
    // Update taskData after deleting a task
    return {
      ...state,
      productsData: state.productsData.filter((task) => task._id !== action.payload),
      isLoading: false,
      isError: false,
    };
    case UPDATE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case UPDATE_ERROR:
      return { ...state, isLoading: false, isError: true };
      case UPDATE_SUCCESS:
        return {
          ...state,
          productsData: state.productsData.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
          isLoading: false,
          isError: false,
        };
      
  default:return state

}
}
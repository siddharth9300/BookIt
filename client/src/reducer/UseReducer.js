// export const initialState = null;

// export const reducer = (state,action)=>{
// if(action.type === "USER"){
//     return action.payload
// }
// return state;
// }

// retrieve the stored value
// const storedUser = localStorage.getItem("user");

 // set the initial state to the stored value, or to null if no value is found
// export const initialState = storedUser ? JSON.parse(storedUser) : null;

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "USER":
      // store the user information in localStorage
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       return action.payload;
//     default:
//       return state;
//   }
// };


const storedUser = localStorage.getItem("user");
const storedUserType = localStorage.getItem("userType");

// set the initial state to the stored value, or to null if no value is found
export const initialState = storedUser ? { user: JSON.parse(storedUser), userType:storedUserType} : { user: null, userType: null };

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      // store the user information in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload } ;
    case "USER_TYPE":
      // store the user type in localStorage
      localStorage.setItem("userType", action.payload);
      return { ...state, userType: action.payload };
    default:
      return state;
  }
};




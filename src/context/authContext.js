import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const initalState = {
  user: null,
};

// const token = Cookies.get("authToken");
// console.log("EVO TOKENA: ", token);
// if (token) {
//   const decodedToken = jwtDecode(token);

//   if (decodedToken * 1000 < Date.now()) {
//     Cookies.remove("authToken");
//   } else {
//     initalState.user = decodedToken;
//   }
// }

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initalState);
  // console.log("state: ", state);

  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  const value = {
    user: state.user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };

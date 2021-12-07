import {
  createContext,
  useReducer,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { retrieveStoredToken } from "./RetrieveToken";

let logoutTimer;
let warningTimer;

export const Store = createContext();
export const useStore = () => useContext(Store);

const initalState = {
  userInfo: localStorage.getItem("food_token")
    ? localStorage.getItem("food_token")
    : null,
  product: {},
  productList: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_GETTOKEN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    case "GET_PRODUCT":
      return { ...state, product: action.payload };
    case "DELETE_PRODUCT_IMAGE":
      const newImageList = state.product.images.filter(
        (_, i) => i !== action.payload
      );
      return { ...state, product: { ...state.product, images: newImageList } };
    case "GET_PRODUCT_LIST":
      return { ...state, productList: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("food_token");
    localStorage.removeItem("food_expirationTime");
    if (logoutTimer || warningTimer) {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("food_token", token);
    localStorage.setItem("food_expirationTime", expirationTime);
  };

  useEffect(() => {
    retrieveStoredToken();
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
    return () => {
      clearTimeout(logoutTimer);
      clearTimeout(warningTimer);
    };
  }, [tokenData, logoutHandler]);
  const value = {
    state,
    dispatch,
    loginHandler,
    setToken,
    logoutHandler,
    userIsLoggedIn,
  };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

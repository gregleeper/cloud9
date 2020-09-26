import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./cartReducer";
import cookie from "js-cookie";
export const CartContext = createContext();

const storage = cookie.get("cart") ? JSON.parse(cookie.get("cart")) : [];

const initialState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const increaseAddIn = (payload) => {
    dispatch({ type: "INCREASE_ADDIN", payload });
  };

  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  const decreaseAddIn = (payload) => {
    dispatch({ type: "DECREASE_ADDIN", payload });
  };

  const addProduct = (payload) => {
    dispatch({ type: "ADD_ITEM", payload });
  };
  const addAddIn = (payload) => {
    dispatch({ type: "ADD_ADDIN", payload });
  };
  const removeProduct = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const removeAddIn = (payload) => {
    dispatch({ type: "REMOVE_ADDIN", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
  };

  const contextValues = {
    removeProduct,
    removeAddIn,
    addProduct,
    addAddIn,
    increase,
    increaseAddIn,
    decrease,
    decreaseAddIn,
    clearCart,
    handleCheckout,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

import "../styles/globals.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Amplify from "aws-amplify";
import config from "../src/aws-exports";
import { useContext } from "react";
import CartContextProvider, { CartContext } from "../lib/cartContext";
import "react-day-picker/lib/style.css";

Amplify.configure({ ...config, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Component {...pageProps} />
    </CartContextProvider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};

export default MyApp;

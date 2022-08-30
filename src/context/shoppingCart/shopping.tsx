import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Product } from "../../entities/product";
import { useProducts } from "../products/Products";
import { Context, initialstate, shoppingReducer } from "./types";
import Swal from "sweetalert2";

const ShoppingContext = createContext<Context>({} as Context);

export const ShopoingProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [{ products }, dispatch] = useReducer(shoppingReducer, initialstate);
  const {
    products: productsDB,
    addToCart,
    removeToCart,
    clearProducts,
  } = useProducts();

  const clearCart = () => {
    clearProducts();
    dispatch({ type: "clear_products" });
  };

  useEffect(() => {
    productsDB.forEach((prod) => {
      if (prod.addedToCart) {
        dispatch({ type: "add_product", payload: prod });
      }
    });
  }, [productsDB]);

  const addProduct = (product: Product) => {
    addToCart(product.id);
    dispatch({ type: "add_product", payload: product });
    Swal.fire(
      `Se ha agregado: ${product.name}`,
      "correctamente al carrito",
      "success"
    );
  };

  const removeProduct = (product: Product) => {
    removeToCart(product.id);
    dispatch({ type: "remove_product", payload: product });
  };

  const totalCart = useMemo(() => {
    return products.reduce((prev, curr) => prev + +curr.price, 0);
  }, [products]);

  return (
    <ShoppingContext.Provider
      value={{
        products,
        totalCart,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => useContext(ShoppingContext);

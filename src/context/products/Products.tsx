import { createContext, useContext, useEffect, useReducer } from "react";
import { productService } from "../../services/products.service";
import { Context, initialState, productsReducer } from "./types";
import Swal from "sweetalert2";

const ProductsContext = createContext<Context>({} as Context);

export const ProductsProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [{ products }, dispatch] = useReducer(productsReducer, initialState);

  const getAllProducts = () => {
    productService.getAll().then((res) => {
      res.forEach((data) => ({ ...data, addedToCart: false }));
      dispatch({ type: "set_all_products", payload: res });
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const updateProductToCart = ({
    id,
    status,
  }: {
    id: string;
    status: boolean;
  }) => {
    productService
      .updateOne({ id, data: { addedToCart: status } })
      .then((res) => {
        if (res === "Not found") {
          Swal.fire(
            `Ups! Ocurrio un problema`,
            "no se pudo agregar al carrito",
            "warning"
          );
          return null;
        }

        dispatch({ type: "update_add_to_cart", payload: { id, status } });
      });
  };

  const clearProducts = () => {
    dispatch({ type: "reset_cart" });
  };

  const addToCart = (id: string) => updateProductToCart({ id, status: true });
  const removeToCart = (id: string) =>
    updateProductToCart({ id, status: false });

  return (
    <ProductsContext.Provider
      value={{ products, addToCart, removeToCart, clearProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

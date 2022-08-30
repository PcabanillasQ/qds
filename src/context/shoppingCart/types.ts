import { Product } from "../../entities/product";

export interface Context extends InitialState {
  totalCart: number;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
}

interface InitialState {
  products: Product[];
}

export const initialstate: InitialState = {
  products: [],
};

type ShoppingAction =
  | { type: "add_product"; payload: Product }
  | { type: "remove_product"; payload: Product }
  | { type: "clear_products" };

export const shoppingReducer = (
  state = initialstate,
  action: ShoppingAction
) => {
  switch (action.type) {
    case "add_product":
      if (
        state.products.findIndex((prod) => prod.id === action.payload.id) === -1
      ) {
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      }
      return {
        ...state,
      };
    case "remove_product":
      return {
        ...state,
        products: [
          ...state.products.filter((prod) => prod.id !== action.payload.id),
        ],
      };
    case "clear_products":
      return { ...state, products: [] };
    default:
      return state;
  }
};

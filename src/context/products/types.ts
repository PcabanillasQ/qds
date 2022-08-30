import { Product } from "../../entities/product";

interface InitialState {
  products: Product[];
}

export interface Context extends InitialState {
  addToCart: (id: string) => void;
  removeToCart: (id: string) => void;
  clearProducts: () => void;
}

export const initialState: InitialState = {
  products: [] as Product[],
};

type ProductsActions =
  | {
      type: "set_all_products";
      payload: Product[];
    }
  | { type: "update_add_to_cart"; payload: { id: string; status: boolean } }
  | { type: "reset_cart" };

export const productsReducer = (
  state = initialState,
  action: ProductsActions
) => {
  switch (action.type) {
    case "set_all_products":
      return { ...state, products: [...action.payload] };
    case "update_add_to_cart":
      const newProducts: Product[] = state.products.map((item) => {
        if (item.id === action.payload.id) {
          item.addedToCart = action.payload.status;
        }
        return item;
      });
      return { ...state, products: [...newProducts] };
    case "reset_cart":
      const resetProducts = state.products.map((prod) => ({
        ...prod,
        addedToCart: false,
      }));
      return { ...state, products: [...resetProducts] };
    default:
      return state;
  }
};

import { getCartData } from "./model/selectors/getCartData";
import { cartActions, cartReducer } from "./model/slice/CartSlice";
import { Cart } from "./ui/Cart/Cart";

export { Cart };
export { cartReducer, cartActions, getCartData };

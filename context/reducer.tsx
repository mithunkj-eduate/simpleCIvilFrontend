import { InitialStateType, initialState } from "./context";
import { Actions } from "./types";

export enum payloadTypes {
  SET_USER = "SET_USER",
  SET_CART = "SET_CART",
  RESET = "RESET",
}
export const reducer = (state: InitialStateType, action: Actions) => {
  switch (action.type) {
    case payloadTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case payloadTypes.SET_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
   
    case payloadTypes.RESET:
      return {
        ...initialState,
        user: state.user,
      };
    default:
      return state;
  }
};

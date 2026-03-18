import { InitialStateType, initialState } from "./context";
import { Actions } from "./types";

export enum payloadTypes {
  SET_USER = "SET_USER",
  SET_CART = "SET_CART",
  SET_LANG = "SET_LANG",
  SET_VERSION = "SET_VERSION",

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

    case payloadTypes.SET_LANG:
      return {
        ...state,
        lang: action.payload.lang,
      };

      
 case payloadTypes.SET_VERSION:
      return {
        ...state,
        version: action.payload.version,
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

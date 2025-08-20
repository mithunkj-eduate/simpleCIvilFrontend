import { InitialStateType, initialState } from "./context";
import { Actions } from "./types";

export enum payloadTypes {
  SET_USER = "SET_USER",
  RESET = "RESET",
}
export const reducer = (state: InitialStateType, action: Actions) => {
  switch (action.type) {
    case payloadTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
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

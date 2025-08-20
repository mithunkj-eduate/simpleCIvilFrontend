import { User } from "@/commenType/commenTypes";
import { InitialStateType } from "./context";
import { payloadTypes } from "./reducer";

type reducerPayload = {
  [payloadTypes.SET_USER]: {
    user: User | null;
  };

  [payloadTypes.RESET]: {
    resetState: InitialStateType;
  };
};
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export type Actions =
  ActionMap<reducerPayload>[keyof ActionMap<reducerPayload>];

"use client";
import React, { createContext, useEffect, useReducer } from "react";
import { Actions } from "./types";
import { payloadTypes, reducer } from "./reducer";
import { User } from "@/commenType/commenTypes";
import Api, { api } from "@/components/helpers/apiheader";
import { CartItem, CartState, ICartItemsArray } from "@/types/cart";

export type InitialStateType = {
  user: User | null;
  cart: ICartItemsArray[];
};

export const initialState: InitialStateType = {
  user: null,
  cart: [],
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}
const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { TOKEN: token } = Api();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    try {
      const res = await api.get(`/user/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // const user = {
      //   id: "6884c59286b465a7ee0a0fe0",
      //   name: "mithun",
      //   role: "admin",
      // };
      // dispatch({
      //   type: payloadTypes.SET_USER,
      //   payload: {
      //     user: {
      //       id: user.id,
      //       name: user.name,
      //       role: user.role,
      //       ...res.data.data,
      //     },
      //   },
      // });

      if (res.status === 200 && res.data) {
        if (res.data && res.data.data) {
          dispatch({
            type: payloadTypes.SET_USER,
            payload: {
              user: {
                id: res.data.data._id,
                name: res.data.data.name,
                role: res.data.data.role,
                ...res.data.data,
              },
            },
          });
        }
      } else {
        console.error("Failed to fetch user data:", res.data);
      }
    } catch (error) {
      console.error("Error setting user:", error);

      dispatch({
        type: payloadTypes.SET_USER,
        payload: { user: null },
      });
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ dispatch, state }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

"use client";
import React, { createContext, useEffect, useReducer } from "react";
import { Actions } from "./types";
import { payloadTypes, reducer } from "./reducer";
import { User } from "@/commenType/commenTypes";
import Api, { api } from "@/components/helpers/apiheader";
import { ICartItem } from "@/types/cart";
import Cookies from "js-cookie";

export type InitialStateType = {
  user: User | null;
  cart: ICartItem[];
  lang: string;
  version: number;
};

export const initialState: InitialStateType = {
  user: null,
  cart: [],
  lang: "en",
  version: 1,
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
  const lang = Cookies.get("lang") ?? "en";
  const version = Cookies.get("version");

  console.log(lang);
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
    dispatch({
      type: payloadTypes.SET_LANG,
      payload: { lang: lang },
    });
  }, [lang]);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (version) {
      dispatch({
        type: payloadTypes.SET_VERSION,
        payload: { version: Number(version) },
      });
    }
  }, [version]);

  return (
    <AppContext.Provider value={{ dispatch, state }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

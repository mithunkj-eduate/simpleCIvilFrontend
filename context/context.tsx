"use client";
import React, { createContext, useEffect, useReducer } from "react";
import { Actions } from "./types";
import axios from "axios";
import { payloadTypes, reducer } from "./reducer";
import { User } from "@/commenType/commenTypes";
import api from "@/components/helpers/apiheader";

export type InitialStateType = {
  user: User | null;
};

export const initialState: InitialStateType = {
  user: null,
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
  const [token, setToken] = React.useState<string | null>(null);
  const { BASE_URL, API_HEADER } = api();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/verify`, API_HEADER);
   
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
    // This code runs only on the client-side
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("token");
      if (storedData) {
        setToken(storedData);
      }
    }
  }, []);

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

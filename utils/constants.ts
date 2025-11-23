import { msgType } from "./commenTypes";
import { Operation } from "./enum.types";

export const emptyMessage: msgType = {
    flag: false,
    message: "",
    operation: Operation.NONE,
  };
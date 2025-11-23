import { Operation } from "@/utils/enum.types";
import { Alert, Snackbar } from "@mui/material";


interface Props {
  modalFlag: boolean;
  value: string;
  handleClose: () => void;
  operation: Operation;
}

const MessageModal = ({ modalFlag, value, handleClose, operation }: Props) => {
  const DEFAULT_HIDE_DURATION = 3;
  const SECONDS_TO_MILLISEC_UNIT = 1000;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      style={{ zIndex: "2000 !important" }}
      open={modalFlag}
      autoHideDuration={DEFAULT_HIDE_DURATION * SECONDS_TO_MILLISEC_UNIT}
      onClose={handleClose}
      className="success-message"
    >
      <Alert
        onClose={handleClose}
        severity={operation === Operation.NONE ? "error" : "success"}
        sx={{
          width: "100%",
          color: "white",
          background: operation === Operation.NONE ? "red" : "green",
        }}
      >
        {value}
      </Alert>
    </Snackbar>
  );
};

export default MessageModal;

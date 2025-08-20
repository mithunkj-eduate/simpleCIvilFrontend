import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddModalProps {
  modalFlag: boolean;
  setModalFlag: (modalFlag: boolean) => void;
  children: React.ReactNode;
}

export default function WideModal({
  modalFlag,
  setModalFlag,
  children,
}: AddModalProps) {
  return (
    <div className="">
      <Modal
        open={modalFlag}
        onClose={setModalFlag}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}

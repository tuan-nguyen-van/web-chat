import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { setUserName } from "../store/userSlice";

const FormDialog = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleGetIn = () => {
    setOpen(false);
    dispatch(setUserName(name));
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Please enter your name to begin.</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Your Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleGetIn}
          disabled={!Boolean(name)}
          id="get-in-button"
        >
          GET IN
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;

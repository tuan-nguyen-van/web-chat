import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const FormDialog = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);

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
        <Button onClick={() => setOpen(false)} disabled={!Boolean(name)}>
          GET IN
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;

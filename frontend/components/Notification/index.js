import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 10,
  },
}));

export default ({ isOpen, severity, msg }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

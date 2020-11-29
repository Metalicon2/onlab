import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import API from "../utils/API";
import router from "next/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: "pointer",
  },
  copyright: {
    margin: theme.spacing(5),
  },
}));

export default () => {
  const classes = useStyles();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    passwordAgain: "",
    address: "",
    phone: "",
  });

  const register = async () => {
    const { password, passwordAgain } = registerData;
    if (!(password === passwordAgain)) {
      return window.alert("Passwords didn't match!");
    }
    const res = await API.post("/user/register", registerData);
    if (res.data.status == 200) {
      router.push("/login");
      window.alert("Succesfull registration!");
    } else {
      window.alert("Something went wrong!");
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          {Object.keys(registerData).map((key) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={key}
              key={key}
              label={(key.charAt(0).toUpperCase() + key.slice(1))
                .replace(/([A-Z])/g, " $1")
                .trim()}
              name={key}
              type={
                key.includes("password")
                  ? "password"
                  : key.includes("email")
                  ? "email"
                  : "text"
              }
              autoComplete={key}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          ))}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => register()}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box>
        <Typography
          className={classes.copyright}
          variant="body2"
          color="textSecondary"
          align="center"
        >
          Copyright © Foodster {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
};

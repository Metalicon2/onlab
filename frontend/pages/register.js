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
    flexGrow: 1
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
      margin: theme.spacing(5)
  }
}));

export default () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const register = async () => {
    if(!(password1 === password2)) {
      return window.alert("Passwords didn't match!");
    }
    const user = {
      email: email,
      password: password1,
      address: address,
      phone: phone
    }
    const res = await API.post("/user/register", user).catch(e => console.log(e));
    if(res.data.status == 200){
      router.push("/login");
      window.alert("Succesfull registration!");
    }else{
      window.alert("Something went wrong!")
    }
  }
  
  return (
    <Container maxWidth="xs"   >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {(e) => setPassword1(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="password1"
            autoComplete="current-password"
            onChange = {(e) => setPassword2(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            onChange = {(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="phone"
            id="phone"
            onChange = {(e) => setPhone(e.target.value)}
          />
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
        <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
          Copyright © Foodster {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
}
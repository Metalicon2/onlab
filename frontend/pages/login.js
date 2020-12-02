import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import NextLink from "next/link";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import API from "../utils/API";
import router from "next/router";
import { addUserAction } from "../redux/actions";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";
import Notification from "../components/Notification";

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

const cookie = new Cookies();

const Login = ({ addUserAction }) => {
  const classes = useStyles();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [notiProps, setNotiProps] = useState({
    isOpen: false,
    severity: null,
    msg: null
  });

  const login = async () => {
    setNotiProps({isOpen: false});
    const res = await API.post("/user/login", loginData);
    if (res.data.status == 200) {
      addUserAction({ email: loginData.email, id: res.data.payload });
      cookie.set("token", res.data.token, { path: "/" });
      router.push(router.query.returnTo ? router.query.returnTo : "/");
    } else if (res.data.status == 400) {
      setNotiProps({isOpen: true, severity: "error", msg: "Wrong password!"});
    } else if (res.data.status == 402) {
      setNotiProps({isOpen: true, severity: "warning", msg: "Empty fields!"});
    } else {
      setNotiProps({isOpen: true, severity: "error", msg: "You don't have an account!"});
    }
  };

  const onEnterPressed = (e) => e.keyCode == 13 && login();

  return (
    <Container maxWidth="xs">
      <Notification {...notiProps} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          {Object.keys(loginData).map((key) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              key={key}
              fullWidth
              id={key}
              label={(key.charAt(0).toUpperCase() + key.slice(1))
                .replace(/([A-Z])/g, " $1")
                .trim()}
              name={key}
              autoComplete={key}
              type={key.includes("password") ? "password" : "email"}
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.id]: e.target.value })
              }
              onKeyDown={(e) => onEnterPressed(e)}
            />
          ))}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NextLink href="">
                <Link color="inherit" className={classes.link} variant="body2">
                  Forgot password?
                </Link>
              </NextLink>
            </Grid>
            <Grid item>
              <NextLink href="/register">
                <Link color="inherit" className={classes.link} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </NextLink>
            </Grid>
          </Grid>
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

const mapDispatchToProps = {
  addUserAction: addUserAction,
};

export default connect(null, mapDispatchToProps)(Login);

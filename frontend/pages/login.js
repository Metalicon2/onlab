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
import { useContext, useState } from "react";
import { Context } from "../Context";
import API from "../utils/API";
import router from "next/router";
import {addUserAction} from "../redux/actions";
import {connect} from "react-redux";

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

const Login = ({addUserAction}) => {
  const classes = useStyles();
  const { setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    console.log("logging in...");
    const user = {
      email: email,
      password: password
    }
    const res = await API.post("/user/login", user).catch(err => console.log(err));
    if(res.data.status == 200){
      addUserAction(user);
      setUser(user);
      router.push("/");
      window.alert("logged in!");
    }else if(res.data.status == 400){
      window.alert("Wrong password!");
    }else if(res.data.status == 402){
      window.alert("Empty fields!");
    }else{
      window.alert("No such user!");
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
          Sign in
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
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
              <NextLink href="#">
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
        <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
          Copyright © Foodster {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
}

Login.getInitialProps = ({store}) => {}

const mapDispatchToProps = {
  addUserAction: addUserAction
}

export default connect(null, mapDispatchToProps)(Login);
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TabSelector from '../Layouts/TabSelector';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
  },
  tabs: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
    
  const { user, setUser, resetCart, setLogChange, logChange } = useContext(Context);
  const path = useRouter().pathname;

  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    const res = window.confirm("Are you sure?");
    if(res){
      setLoggedOut(true);
      setUser({});
      resetCart();
      window.alert("You have logget out!");
    }else{
      setLoggedOut(false);
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <FastfoodIcon />
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            Foodster
          </Typography>
        </Link>
        <TabSelector />
        <Link href="/cart">
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        {
          !user.email && <Link href="/login">
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Link>
        }
        {user.email && <Link href={loggedOut ? "/" : path}>
          <IconButton onClick={() => logout()} color="inherit">
            <ExitToAppIcon/>
          </IconButton>
        </Link>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

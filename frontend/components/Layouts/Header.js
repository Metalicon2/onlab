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
import { useState } from "react";
import { useRouter } from "next/router";
import { deleteUserAction, resetCartAction, setLoadedAction } from "../../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
  },
  tabs: {
    flexGrow: 1,
  },
}));

const Header = ({ deleteUserAction, user, resetCartAction, setLoadedAction }) => {
  const classes = useStyles();

  const path = useRouter().pathname;

  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    const res = window.confirm("Are you sure?");
    if (res) {
      setLoggedOut(true);
      deleteUserAction();
      resetCartAction();
      window.alert("You have logget out!");
    } else {
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
        {user.email && <Link href={path}>
          <IconButton onClick={() => logout()} color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Link>}
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = {
  deleteUserAction: deleteUserAction,
  resetCartAction: resetCartAction,
  setLoadedAction: setLoadedAction
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

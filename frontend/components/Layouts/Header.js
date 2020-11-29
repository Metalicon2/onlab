import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TabSelector from "../Layouts/TabSelector";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useRouter } from "next/router";
import { deleteUserAction, resetCartAction, setFoodListAction } from "../../redux/actions";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";
import { useEffect } from "react";

const cookie = new Cookies();

const useStyles = makeStyles(() => ({
  title: {
    cursor: "pointer",
    textShadow: "3px 3px 5px rgba(0,0,0,0.5)",
  },
  tabs: {
    flexGrow: 1,
  },
  icon: {
    color: "#FA7D32",
  },
}));

const Header = ({ deleteUserAction, user, resetCartAction, isTokenValid, setFoodListAction }) => {
  const classes = useStyles();
  const router = useRouter();

  const path = router.pathname;

  const logout = () => {
    cookie.remove("token", { path: "/" });
    deleteUserAction();
    resetCartAction();
    setFoodListAction([]);
  };

  useEffect(() => {
    if (!isTokenValid) {
      deleteUserAction();
      setFoodListAction([]);
    }
  }, [isTokenValid]);

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <FastfoodIcon className={classes.icon} />
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            Foodster
          </Typography>
        </Link>
        <TabSelector user={user} />
        <Link href="/cart">
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        {!user.email ? (
          <Link href="/login">
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </Link>
        ) : (
          <>
            <Link href={path}>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Link>
            <Link href={path}>
              <IconButton onClick={() => logout()} color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = {
  deleteUserAction: deleteUserAction,
  resetCartAction: resetCartAction,
  setFoodListAction: setFoodListAction
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

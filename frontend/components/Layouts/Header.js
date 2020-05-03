import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
} from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Link from "next/link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TabSelector from '../Layouts/TabSelector';

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
        <Link href="/login">
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

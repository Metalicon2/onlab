import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Router from "next/router";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  tabStyles: {
    backgroundColor: "#FA7D32",
  },
  something: {
    "& > div > div > button": {
      opacity: 1,
      "&$selected": {
        backgroundColor: "#004C9B",
        color: "white",
      },
    },
  },
}));

const TabSelectors = () => {
  const classes = useStyles();

  const redirect = (route) => {
    Router.push("/menu/[menu]", `/menu/${route}`);
  };

  return (
    <div className={classes.root}>
      <Tabs
        aria-label="simple tabs example"
        centered
        TabIndicatorProps={{ className: classes.tabStyles }}
        className={classes.something}
      >
        <Tab onClick={() => redirect("appetizer")} label="Appetizer" />
        <Tab onClick={() => redirect("maindish")} label="Main Dishes" />
        <Tab onClick={() => redirect("dessert")} label="Desserts" />
      </Tabs>
    </div>
  );
};

export default TabSelectors;

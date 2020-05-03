import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const TabSelectors = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(-1);
  const {menu} = useRouter().query;

  useEffect(() => {
    !menu ? setValue(-1) : null;
  }, [menu]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const redirect = (route) => {
    Router.push("/menu/[menu]", `/menu/${route}`);
  };

  return (
    <div className={classes.root}>
      <Tabs
        defaultValue={-1}
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        centered
      >
        <Tab onClick={() => redirect("appetizers")} label="Appetizers" />
        <Tab onClick={() => redirect("maindishes")} label="Main Dishes" />
        <Tab onClick={() => redirect("desserts")} label="Desserts" />
      </Tabs>
    </div>
  );
};

export default TabSelectors;

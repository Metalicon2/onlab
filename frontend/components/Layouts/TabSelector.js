import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  tabStyles: {
    backgroundColor: "#FA7D32",
  },
  something: {
    "& > div > div > button:hover": {
      color: "#FA7D32",
    },
    "& > div > div > button": {
      opacity: 1,
      '&$selected': {
        backgroundColor: '#004C9B',
        color: 'white',
      },
    }
  }
}));

const TabSelectors = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(-1);
  const { menu } = useRouter().query;

  useEffect(() => {
    !menu ? setValue(-1) : null;
  }, [menu]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const redirect = (route) => {
    Router.push("/menu/[menu]", `/menu/${route}`, { shallow: true });
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        centered
        TabIndicatorProps={{ className: classes.tabStyles }}
        className={classes.something}
      >
        <Link href='/menu/[menu]' as={`/menu/appetizer`}><a>asd</a></Link>
        <Tab onClick={() => redirect("maindish")} label="Main Dishes" />
        <Tab onClick={() => redirect("dessert")} label="Desserts" />
      </Tabs>
    </div>
  );
};

export default TabSelectors;

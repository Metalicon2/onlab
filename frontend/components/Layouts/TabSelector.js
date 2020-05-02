import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const TabSelectors = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Tab label="Appetizers" />
        <Tab label="Main Dishes" />
        <Tab label="Desserts" />
      </Tabs>
    </div>
  );
}

export default TabSelectors;

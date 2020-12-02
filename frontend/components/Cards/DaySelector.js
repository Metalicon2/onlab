import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import { connect } from "react-redux";
import { setDayAction } from "../../redux/actions";

const useStyle = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const days = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
};

const DaySelector = ({ setDayAction, day }) => {
  const classes = useStyle();
  const [value, setValue] = useState(
    day ? Object.keys(days).findIndex((item) => days[item] === day) : 0
  );

  const handleChange = (_, newValue) => {
    setDayAction(days[newValue]);
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        aria-label="dayselector"
        variant="fullWidth"
        onChange={handleChange}
        value={value}
      >
        {Object.keys(days).map((key) => (
          <Tab label={days[key]} key={key} />
        ))}
      </Tabs>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return { day: state.day };
};

const mapDispathToProps = {
  setDayAction: setDayAction,
};

export default connect(mapStateToProps, mapDispathToProps)(DaySelector);

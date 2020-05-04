import { FormControlLabel, Switch } from "@material-ui/core";

const SwitchBar = () => {
  return (
    <>
      <FormControlLabel control={<Switch />} label="Corona free" />
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Vegetarian"
      />
      <FormControlLabel control={<Switch color="primary" />} label="Spicy" />
    </>
  );
};

export default SwitchBar;
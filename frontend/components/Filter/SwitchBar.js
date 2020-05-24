import { FormControlLabel, Switch } from "@material-ui/core";

const SwitchBar = ({handleSwitch, checkedVega, checkedSpicy}) => {

  return (
    <>
      <FormControlLabel control={<Switch color="primary"/>} label="Price (L -> H)" />
      <FormControlLabel control={<Switch color="primary"/>} label="Price (H -> L)" />
      <FormControlLabel
        control={<Switch color="primary" checked={checkedVega} onChange={() => {handleSwitch("vega");}}/>}
        label="Vegetarian"
      />
      <FormControlLabel control={<Switch color="primary" checked={checkedSpicy} onChange={() => {handleSwitch("spicy");}}/>} 
      label="Spicy" />
    </>
  );
};

export default SwitchBar;
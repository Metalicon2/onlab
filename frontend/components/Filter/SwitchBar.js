import { FormControlLabel, Switch } from "@material-ui/core";
import { connect } from "react-redux";
import { setCheckedVegaAction, setCheckedSpicyAction, setIsFilteredAction, setFilteredFoodListAction } from "../../redux/actions";

const SwitchBar = ({ vegaChecked, spicyChecked, foodList, lowToHigh, setCheckedVegaAction, setCheckedSpicyAction, setIsFilteredAction, setFilteredFoodListAction, }) => {

  const handleSwitch = (switchName) => {
    let tempVega = vegaChecked;
    let tempSpicy = spicyChecked;
    let tempLH = lowToHigh;
    if (switchName === "vega") {
      tempVega = !vegaChecked;
      setCheckedVegaAction(tempVega);
    } else if (switchName === "spicy") {
      tempSpicy = !spicyChecked;
      setCheckedSpicyAction(tempSpicy);
    }
    if (tempVega && tempSpicy) {
      setIsFilteredAction(true);
      setFilteredFoodListAction(foodList.filter(item => item.spicy === tempSpicy && item.vegetarian === tempVega));
      console.log("both");
    } else if (tempVega) {
      setIsFilteredAction(true);
      setFilteredFoodListAction(foodList.filter(item => item.vegetarian === tempVega));
      console.log("vega");
    }
    else if (tempSpicy) {
      setIsFilteredAction(true);
      setFilteredFoodListAction(foodList.filter(item => item.spicy === tempSpicy));
      console.log("spicy");
    }
    else {
      setIsFilteredAction(false);
    }
  }

  return (
    <>
      <FormControlLabel
        control={<Switch color="primary" checked={vegaChecked} onChange={() => handleSwitch("vega")} />}
        label="Vegetarian"
      />
      <FormControlLabel control={<Switch color="primary" checked={spicyChecked} onChange={() => handleSwitch("spicy")} />}
        label="Spicy" />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    vegaChecked: state.vegaChecked,
    spicyChecked: state.spicyChecked,
    foodList: state.foodList,
  }
}

const mapDispatchToProps = {
  setCheckedVegaAction: setCheckedVegaAction,
  setCheckedSpicyAction: setCheckedSpicyAction,
  setIsFilteredAction: setIsFilteredAction,
  setFilteredFoodListAction, setFilteredFoodListAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchBar);
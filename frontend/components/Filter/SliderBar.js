import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { connect } from "react-redux";
import { setSliderValueAction, setIsFilteredAction, setFilteredFoodListAction } from "../../redux/actions";

const RangeSlider = ({ maxPrice, sliderValue, setSliderValueAction, setIsFilteredAction, setFilteredFoodListAction, foodList}) => {
  function valuetext(value) {
    return `${value} Ft`;
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValueAction(newValue);
    if (newValue[1] * maxPrice / 100 < maxPrice || newValue[0] > 0) {
      setIsFilteredAction(true);
      setFilteredFoodListAction(foodList.filter(item => item.price >= newValue[0] * maxPrice / 100 && item.price <= newValue[1] * maxPrice / 100));
    } else {
      setIsFilteredAction(false);
    }
  };

  const marks = [
    {
      value: 0,
      label: '0 Ft',
    },
    {
      value: 100,
      label: `${maxPrice} Ft`,
    }
  ];

  return (
    <div>
      <Typography id="range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        marks={marks}
        scale={(x) => Math.round(maxPrice / 100 * x)}
        step={maxPrice / (maxPrice / 100) / (maxPrice / 100)}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    maxPrice: state.maxPrice,
    sliderValue: state.sliderValue,
    foodList: state.foodList
  }
}

const mapDispatchToProps = {
  setSliderValueAction: setSliderValueAction,
  setIsFilteredAction: setIsFilteredAction, 
  setFilteredFoodListAction: setFilteredFoodListAction
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeSlider);
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const RangeSlider = ({maxPrice, value, handleChange}) => {
  function valuetext(value)  {
    return `${value} Ft`;
  }

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
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        marks={marks}
        scale={(x) => Math.round(maxPrice/100 * x)}
        step={maxPrice/(maxPrice/100)/(maxPrice/100)}
      />
    </div>
  );
}

export default RangeSlider;
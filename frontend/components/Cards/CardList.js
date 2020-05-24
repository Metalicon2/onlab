import Card from "./Card";
import { Container, TextField, Paper } from "@material-ui/core";
import TabBar from "../Filter/TabBar";
import RangeSlider from "../Filter/SliderBar";
import SwitchBar from "../Filter/SwitchBar";
import { useMemo } from "react";

const CardList = React.memo(({ data, subCategoryList, maxPrice, setSubCategory, tabValue,
  handleTabChange, sliderValue, setSliderValue, handleSearchChange, handleSwitchChange, checkedVega, checkedSpicy }) => {

  const switchcomp = useMemo(() => <SwitchBar handleSwitch={handleSwitchChange} checkedVega={checkedVega} checkedSpicy={checkedSpicy}/>, 
                                      [handleSwitchChange, checkedVega, checkedSpicy]);
  const sliderComp = useMemo(() => <div style={{ marginTop: "10px" }}>{console.log("render")}<RangeSlider maxPrice={maxPrice} value={sliderValue} handleChange={setSliderValue}/></div>
  , [sliderValue, maxPrice, setSliderValue])

  return (
    <>
      <div style={{ flex: 1, height: "100%", padding: "10px" }}>
        <Paper style={{ height: "100%", padding: "10px 0" }}>
          <TabBar subCategoryList={subCategoryList} setSubCategory={setSubCategory} tabValue={tabValue} handleChange={handleTabChange}/>
          <Container style={{ userSelect: "none" }}>
            {sliderComp}
            <TextField id="standard-basic" label="Search" onChange={(e) => handleSearchChange(e.target.value)}/>
            <div style={{ marginTop: "10px" }}>
              {switchcomp}
            </div>
          </Container>
        </Paper>
      </div>
      <div style={{ flex: 4, height: "805px", overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start",
            height: "100%",
          }}
        >
          {data.map((item, index) => (
            <Card name={item.name} desc={item.description} price={item.price} key={index} key={index} color={item.color} src={item.src}/>
          ))}
        </div>
      </div>
    </>
  );
});

export default CardList;

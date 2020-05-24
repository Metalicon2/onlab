import Card from "./Card";
import { Container, Paper } from "@material-ui/core";
import TabBar from "../Filter/TabBar";
import RangeSlider from "../Filter/SliderBar";
import SwitchBar from "../Filter/SwitchBar";
import { connect } from "react-redux";
import SearchField from "../Filter/SearchField";

const CardList = ({ foodList, filteredFoodList, isFiltered }) => {

  return (
    <>
      <div style={{ flex: 1, height: "100%", padding: "10px" }}>
        <Paper style={{ height: "100%", padding: "10px 0" }}>
          <TabBar />
          <Container style={{ userSelect: "none" }}>
            <div style={{ marginTop: "10px" }}><RangeSlider /></div>
            <SearchField />
            <div style={{ marginTop: "10px" }}>
              <SwitchBar />
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
          {
            isFiltered && filteredFoodList.map((item, index) => (
              <Card name={item.name} desc={item.description} price={item.price} key={index} key={index} color={item.color} src={item.src} />
            ))
          }
          {
            !isFiltered && foodList.map((item, index) => (
              <Card name={item.name} desc={item.description} price={item.price} key={index} key={index} color={item.color} src={item.src} />
            ))
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodList: state.foodList,
    filteredFoodList: state.filteredFoodList,
    isFiltered: state.isFiltered
  }
}

export default connect(mapStateToProps, null)(CardList);

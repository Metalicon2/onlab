import Card from "./Card";
import { Container, Paper, CircularProgress } from "@material-ui/core";
import TabBar from "../Filter/TabBar";
import RangeSlider from "../Filter/SliderBar";
import SwitchBar from "../Filter/SwitchBar";
import { connect } from "react-redux";
import SearchField from "../Filter/SearchField";
import styles from "./CardList.module.css";

const CardList = ({loaded, foodList, filteredFoodList, isFiltered }) => {
  return (
    <>
      <div style={{ flex: 1, height: "100%", padding: "10px", backgroundColor: "rgba(63,81,181, 0.9)" }}>
        <Paper style={{ height: "100%", padding: "10px 0" }}>
          <TabBar />
          <Container style={{ userSelect: "none" }}>
            <div style={{ marginTop: "10px", margin: "10px 10px 0 0" }}><RangeSlider /></div>
            <SearchField />
            <div style={{ marginTop: "10px" }}>
              <SwitchBar />
            </div>
          </Container>
        </Paper>
      </div>
      <div className={styles.hide} style={{ flex: 4, height: "805px", overflowY: "auto" }}>
        {
          loaded && <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
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
                <Card name={item.name} desc={item.description} price={item.price} key={index} key={index} color={item.color} src={item.src} id={item.id} />
              ))
            }
          </div>
        }
        {
          !loaded && <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
            <CircularProgress style={{ alignSelf: "center", width: "80px", height: "80px" }} />
          </div>
        }
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodList: state.foodList,
    filteredFoodList: state.filteredFoodList,
    isFiltered: state.isFiltered,
    loaded: state.loaded
  }
}

export default connect(mapStateToProps, null)(CardList);

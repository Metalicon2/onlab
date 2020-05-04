import Card from "./Card";
import { Container, TextField, Paper } from "@material-ui/core";
import TabBar from "../Filter/TabBar";
import RangeSlider from "../Filter/SliderBar";
import SwitchBar from "../Filter/SwitchBar";

const CardList = ({ data }) => {
  return (
    <>
      <div style={{ flex: 1, height: "100%", padding: "10px" }}>
        <Paper style={{ height: "100%", padding: "10px 0" }}>
          <TabBar />
          <Container style={{ userSelect: "none" }}>
            <div style={{ marginTop: "10px" }}>
              <RangeSlider />
            </div>
            <TextField id="standard-basic" label="Search" />
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
          {data.map((item, index) => (
            <Card name={item.name} desc={item.desc} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;

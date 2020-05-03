import Card from "./Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container, Grid } from "@material-ui/core";

const CardList = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div style={{ flex: 1, marginTop: "10px" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
        </Tabs>
      </div>
      <div style={{ flex: 4}}>
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between"}}>
          {data.map((item, index) => (
            <Card name={item.name} desc={item.desc} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;

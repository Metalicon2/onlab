import Card from "./Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import {
  Container,
  Grid,
  Slider,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Switch,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const CardList = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: 200,
      margin: "auto",
      userSelect: "none",
      flex: 1
    },
    tabRoot: {
      flex: 1,
      backgroundColor: theme.palette.background.paper,
      height: 200,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));

  return (
    <>
      <div style={{ flex: 1, margin: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={useStyles().tabRoot}>
            <Paper>
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
            </Paper>
          </div>
          <Paper>
          <div style={{marginTop: "10px"}} className={useStyles().root}>
            <Typography id="range-slider" gutterBottom>
              Price range
            </Typography>
            <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" />
          </div>
          <form className={useStyles().root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Search" />
          </form>
          <div style={{ marginTop: "10px" }} className={useStyles().root}>
            <FormControlLabel control={<Switch />} label="Corona free" />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Vegetarian"
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Spicy"
            />
          </div>
          </Paper>
        </div>
      </div>
      <div style={{ flex: 4 }}>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start",
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

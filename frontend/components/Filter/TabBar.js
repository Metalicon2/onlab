import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import {
  setSubCategoryAction,
  setTabValueAction,
  setMaxPriceAction,
  setIsFilteredAction,
  setSliderValueAction,
} from "../../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    width: "240px",
    height: "250px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    width: "240px",
    height: "250px",
    "& > div": {
      alignSelf: "center",
      width: "40px",
      height: "40px",
    },
  },
}));

const TabBar = ({
  loaded,
  tabValue,
  subCategoryList,
  isFiltered,
  setSubCategoryAction,
  setTabValueAction,
  setMaxPriceAction,
  setIsFilteredAction,
  setSliderValueAction,
  foodList,
}) => {
  const classes = useStyle();

  const handleTabChange = (_, newValue) => {
    setTabValueAction(newValue);
  };

  const sortMaxPrice = (tempData) =>
    Math.max(...tempData.map((item) => item.price));

  const handleClick = (subCat) => {
    const listSortedBySubCat = foodList.filter(
      (item) => item.subCategory === subCat
    );
    setSubCategoryAction(subCat);
    setMaxPriceAction(sortMaxPrice(listSortedBySubCat));
    if (isFiltered) {
      setIsFilteredAction(false);
      setSliderValueAction([0, sortMaxPrice(listSortedBySubCat)]);
    }
  };

  return (
    <>
      {loaded ? (
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
          >
            {subCategoryList.map((item) => (
              <Tab
                onClick={() => handleClick(item)}
                key={item}
                label={item}
              ></Tab>
            ))}
          </Tabs>
        </div>
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = {
  setSubCategoryAction: setSubCategoryAction,
  setTabValueAction: setTabValueAction,
  setMaxPriceAction: setMaxPriceAction,
  setIsFilteredAction: setIsFilteredAction,
  setSliderValueAction: setSliderValueAction,
};

const mapStateToProps = (state) => {
  return {
    tabValue: state.tabValue,
    subCategoryList: state.subCategoryList,
    isFiltered: state.isFiltered,
    foodList: state.foodList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

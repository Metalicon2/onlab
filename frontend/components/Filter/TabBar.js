import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { setSubCategoryAction, setTabValueAction, setMaxPriceAction, setIsFilteredAction, setSliderValueAction, setFoodListAction, setLoadedAction } from "../../redux/actions";
import API from "../../utils/API";
import CircularProgress from '@material-ui/core/CircularProgress';

const TabBar = ({ loaded, tabValue, subCategoryList, isFiltered, 
  setSubCategoryAction, setTabValueAction, setMaxPriceAction, setIsFilteredAction, setSliderValueAction, setFoodListAction, setLoadedAction }) => {

  const handleTabChange = (event, newValue) => {
    setTabValueAction(newValue);
  };

  const sortMaxPrice = (tempData) => {
    const priceList = tempData.map(item => item.price);
    return Math.max(...priceList);
  }

  const handleClick = (item) => {
    setLoadedAction(false);
    setSubCategoryAction(item);
    API.get(`/food/sub/${item}`).then(res => {
      if (res.data[0].name) {
        setMaxPriceAction(sortMaxPrice(res.data));
        if (isFiltered) {
          setIsFilteredAction(false);
          setSliderValueAction([0, sortMaxPrice(res.data)]);
        }
        setFoodListAction(res.data.sort(function (a, b) {
          return a.price - b.price;
        }))
        setLoadedAction(true);
      }
    })
  }

  return (
    <>
      {loaded && 
      <div style={{width: "240px", height: "250px"}}><Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
      >
        {
          subCategoryList.map(item => <Tab onClick={() => handleClick(item)} key={item} label={item}></Tab>)
        }
      </Tabs></div>
      }
      {
        !loaded && <div style={{display: "flex", justifyContent: "center", width:"240px", height: "250px"}}>
        <CircularProgress style={{alignSelf: "center", width: "40px", height: "40px"}}/>
      </div>
      }
    </>
  );
};

const mapDispatchToProps = {
  setSubCategoryAction: setSubCategoryAction,
  setTabValueAction: setTabValueAction,
  setMaxPriceAction: setMaxPriceAction,
  setIsFilteredAction: setIsFilteredAction,
  setSliderValueAction: setSliderValueAction,
  setFoodListAction: setFoodListAction,
  setLoadedAction: setLoadedAction
}

const mapStateToProps = (state) => {
  return {
    tabValue: state.tabValue,
    subCategoryList: state.subCategoryList,
    isFiltered: state.isFiltered,
    loaded: state.loaded
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

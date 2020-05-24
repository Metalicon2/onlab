import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {connect} from "react-redux";
import { setSubCategoryAction, setTabValueAction } from "../../redux/actions";

const TabBar = ({tabValue, setSubCategoryAction, setTabValueAction, subCategoryList}) => {

  const handleTabChange = (event, newValue) => {
    setTabValueAction(newValue);
  };

  return (
    <Tabs
      defaultValue={0}
      orientation="vertical"
      variant="scrollable"
      value={tabValue}
      onChange={handleTabChange}
      aria-label="Vertical tabs example"
    >
      {
        subCategoryList.map(item => <Tab onClick={() => setSubCategoryAction(item)} key={item} label={item}></Tab>)
      }
    </Tabs>
  );
};

const mapDispatchToProps = {
  setSubCategoryAction: setSubCategoryAction,
  setTabValueAction: setTabValueAction
}

const mapStateToProps = (state) => {
  return {
    tabValue: state.tabValue,
    subCategoryList: state.subCategoryList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

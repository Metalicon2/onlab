import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const TabBar = ({subCategoryList, setSubCategory, tabValue, handleChange}) => {
  return (
    <Tabs
      defaultValue={0}
      orientation="vertical"
      variant="scrollable"
      value={tabValue}
      onChange={handleChange}
      aria-label="Vertical tabs example"
    >
      {
        subCategoryList.map(item => <Tab onClick={() => setSubCategory(item)} key={item} label={item}></Tab>)
      }
    </Tabs>
  );
};

export default TabBar;

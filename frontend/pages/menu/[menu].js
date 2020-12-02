import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardList from "../../components/Cards/CardList";
import API from "../../utils/API";
import { connect } from "react-redux";
import {
  setMaxPriceAction,
  setFoodListAction,
  setIsFilteredAction,
  setSubCategoryAction,
  setTabValueAction,
  setSubCategoryListAction,
  setSliderValueAction,
} from "../../redux/actions";
import { Container, Paper } from "@material-ui/core";
import TabBar from "../../components/Filter/TabBar";
import RangeSlider from "../../components/Filter/SliderBar";
import SwitchBar from "../../components/Filter/SwitchBar";
import SearchField from "../../components/Filter/SearchField";
import { makeStyles } from "@material-ui/core/styles";
import { Cookies } from "react-cookie";

const useStyle = makeStyles(() => ({
  root: {
    flex: 1,
    height: "100%",
    padding: "10px",
    backgroundColor: "rgba(63,81,181, 0.9)",
    "& > div": {
      height: "100%",
      padding: "10px 0",
      "& > div:nth-child(2)": {
        userSelect: "none",
        "& > div:nth-child(1)": {
          marginTop: "10px",
          margin: "10px 10px 0 0",
        },
        "& > div:nth-child(3)": {
          marginTop: "10px",
        },
      },
    },
  },
}));

const cookie = new Cookies();

const Menu = ({
  isFiltered,
  setSliderValueAction,
  setMaxPriceAction,
  setFoodListAction,
  setSubCategoryAction,
  setTabValueAction,
  setSubCategoryListAction,
}) => {
  const { menu } = useRouter().query;
  const classes = useStyle();
  const [loaded, setLoaded] = useState(false);

  const sortMaxPrice = (tempData) =>
    Math.max(...tempData.map((item) => item.price));

  useEffect(() => {
    setLoaded(false);
    (async () => {
      const res = await API.get(`/food/main/${menu}`, {
        headers: {
          Authorization: cookie.get("token", { path: "/" }),
        },
      });
      if (res?.data[0]?.name) {
        if (isFiltered) {
          setIsFilteredAction(false);
          setSliderValueAction([0, sortMaxPrice(res.data)]);
        }
        const tempSub = [...new Set(res.data.map((item) => item.subCategory))];
        setSubCategoryListAction(tempSub);
        setMaxPriceAction(sortMaxPrice(res.data));
        setSubCategoryAction(tempSub[0]);
        setTabValueAction(0);
        res.data = res.data.sort((a, b) => a.price - b.price);
        setFoodListAction(res.data);
        setLoaded(true);
      }
    })();
  }, [menu]);

  return (
    <>
      <div className={classes.root}>
        <Paper>
          <TabBar loaded={loaded} />
          <Container>
            <div>
              <RangeSlider />
            </div>
            <SearchField />
            <div>
              <SwitchBar />
            </div>
          </Container>
        </Paper>
      </div>
      <CardList loaded={loaded} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isFiltered: state.isFiltered,
  };
};

const mapDispatchToProps = {
  setMaxPriceAction: setMaxPriceAction,
  setFoodListAction: setFoodListAction,
  setIsFilteredAction: setIsFilteredAction,
  setSubCategoryAction: setSubCategoryAction,
  setTabValueAction: setTabValueAction,
  setSubCategoryListAction: setSubCategoryListAction,
  setSliderValueAction: setSliderValueAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

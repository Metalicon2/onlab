import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardList from "../../components/Cards/CardList";
import API from "../../utils/API";
import { connect } from "react-redux";
import {
  setMaxPriceAction,
  setFoodListAction,
  setFilteredFoodListAction,
  setIsFilteredAction,
  setSubCategoryAction,
  setTabValueAction,
  setSubCategoryListAction,
  setSliderValueAction,
  setLoadedAction,
} from "../../redux/actions";

const Menu = ({
  user,
  setMaxPriceAction,
  setFoodListAction,
  setSubCategoryAction,
  setTabValueAction,
  setSubCategoryListAction,
  setLoadedAction,
}) => {
  const { menu } = useRouter().query;

  const sortSubCategory = (tempData) => {
    const subList = tempData.map((item) => item.subCategory);
    const res = [...new Set(subList)];
    return res;
  };

  const sortMaxPrice = (tempData) => {
    const priceList = tempData.map((item) => item.price);
    return Math.max(...priceList);
  };

  useEffect(() => {
    setLoadedAction(false);
    (async (menu) => {
      const res = await API.get(`/food/main/${menu}`);
      if (res?.data[0]?.name) {
        const temp = sortSubCategory(res.data);
        setSubCategoryListAction(temp);
        setMaxPriceAction(sortMaxPrice(res.data));
        setSubCategoryAction(temp[0]);
        setTabValueAction(0);
        res.data = res.data.sort(function (a, b) {
          return a.price - b.price;
        });
        setFoodListAction(
          res.data.filter((item) => item.subCategory === temp[0])
        );
        setLoadedAction(true);
      }
    })(menu);
  }, [menu]);

  return (
    <>
      <CardList />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    maxPrice: state.maxPrice,
    foodList: state.foodList,
    filteredFoodList: state.filteredFoodList,
    isFiltered: state.isFiltered,
    subCategory: state.subCategory,
    user: state.user,
  };
};

const mapDispatchToProps = {
  setMaxPriceAction: setMaxPriceAction,
  setFoodListAction: setFoodListAction,
  setFilteredFoodListAction: setFilteredFoodListAction,
  setIsFilteredAction: setIsFilteredAction,
  setSubCategoryAction: setSubCategoryAction,
  setTabValueAction: setTabValueAction,
  setSubCategoryListAction: setSubCategoryListAction,
  setSliderValueAction: setSliderValueAction,
  setLoadedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

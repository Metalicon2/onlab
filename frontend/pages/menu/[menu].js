import { useRouter } from "next/router";
import { useEffect } from "react";
import CardList from "../../components/Cards/CardList";
import API from "../../utils/API";
import { connect } from "react-redux";
import {
  setMaxPriceAction, setFoodListAction, setFilteredFoodListAction,
  setIsFilteredAction, setSubCategoryAction, setTabValueAction, setSubCategoryListAction, setSliderValueAction
} from "../../redux/actions";

const Menu = (
  { allFood, foodList, isFiltered, subCategory,
    setIsFilteredAction, setMaxPriceAction, setFoodListAction,
    setSubCategoryAction, setTabValueAction, setSubCategoryListAction, setSliderValueAction }) => {

  const { menu } = useRouter().query;

  const sortSubCategory = (tempData) => {
    const subList = tempData.map(item => item.subCategory);
    const res = [...new Set(subList)];
    return res;
  }

  const sortMaxPrice = (tempData) => {
    const priceList = tempData.map(item => item.price);
    return Math.max(...priceList);
  }

  useEffect(() => {
    const setList = async (menu) => {
      /*if (typeof allFood === "object" && allFood.length > 0) {
        const tempFood = allFood.filter(item => item.mainCategory === menu);
        const temp = sortSubCategory(tempFood);
        setSubCategoryListAction(temp);
        setMaxPriceAction(sortMaxPrice(tempFood));
        setSubCategoryAction(temp[0]);
        setTabValueAction(0);
      } else {
        */const res = await API.get(`/food/main/${menu}`);
        if (res.data[0].name) {
          const temp = sortSubCategory(res.data);
          setSubCategoryListAction(temp);
          setMaxPriceAction(sortMaxPrice(res.data));
          setSubCategoryAction(temp[0]);
          setTabValueAction(0);
        }
      }
    setList(menu);
  }, [menu]);

  useEffect(() => {
    const setList = async () => {
      const res = await API.get(`/food/sub/${subCategory}`);
      if (res.data[0].name) {
        setMaxPriceAction(sortMaxPrice(res.data));
        if (isFiltered) {
          setIsFilteredAction(false);
          setSliderValueAction([0, sortMaxPrice(res.data)]);
        }
        setFoodListAction(res.data);
      }
    }
    if (subCategory) setList();
  }, [subCategory]);

  return (
    <>
      {foodList.length !== 0 &&
        <CardList />
      }
    </>
  )
};

Menu.getInitialProps = async () => {
  const res = await API.get(`/food/all`);
  if (res.data[0].name) {
    return {
      allFood: res.data
    }
  } else {
    return {
      allFood: []
    }
  }
}

const mapStateToProps = (state) => {
  return {
    maxPrice: state.maxPrice,
    foodList: state.foodList,
    filteredFoodList: state.filteredFoodList,
    isFiltered: state.isFiltered,
    subCategory: state.subCategory
  }
}

const mapDispatchToProps = {
  setMaxPriceAction: setMaxPriceAction,
  setFoodListAction: setFoodListAction,
  setFilteredFoodListAction: setFilteredFoodListAction,
  setIsFilteredAction: setIsFilteredAction,
  setSubCategoryAction: setSubCategoryAction,
  setTabValueAction: setTabValueAction,
  setSubCategoryListAction: setSubCategoryListAction,
  setSliderValueAction: setSliderValueAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

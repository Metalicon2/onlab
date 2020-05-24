import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useContext } from "react";
import CardList from "../../components/Cards/CardList";
import API from "../../utils/API";

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const { menu } = useRouter().query;
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [allFood, setAllFood] = useState([]);
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [checkedVega, setCheckedVega] = useState(false);
  const [checkedSpicy, setCheckedSpicy] = useState(false);

  const handleSliderChange = useCallback((event, newValue) => {
    setSliderValue(newValue);
    if (newValue[1] * maxPrice / 100 < maxPrice || newValue[0] > 0) {
      setIsFiltered(true);
      setFilteredFoodList(foodList.filter(item => item.price >= newValue[0] * maxPrice / 100 && item.price <= newValue[1] * maxPrice / 100));
    } else {
      setIsFiltered(false);
    }
  }, [sliderValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (value) => {
    if (value.length) {
      setIsFiltered(true);
      setFilteredFoodList(foodList.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setIsFiltered(false);
    }
  }

  const handleSwitchChange = (switchName) => {
    let tempVega = checkedVega;
    let tempSpicy = checkedSpicy;
    if (switchName === "vega") {
      tempVega = !checkedVega;
      setCheckedVega(prevState => !prevState);
    } else if (switchName === "spicy") {
      tempSpicy = !checkedSpicy;
      setCheckedSpicy(prevState => !prevState);
    }
    if (tempVega && tempSpicy) {
      setIsFiltered(true);
      setFilteredFoodList(foodList.filter(item => item.spicy === tempSpicy && item.vegetarian === tempVega));
      console.log("both");
    } else if (tempVega) {
      setIsFiltered(true);
      setFilteredFoodList(foodList.filter(item => item.vegetarian === tempVega));
      console.log("vega");
    }
    else if (tempSpicy) {
      setIsFiltered(true);
      setFilteredFoodList(foodList.filter(item => item.spicy === tempSpicy));
      console.log("spicy");
    }
    else {
      setIsFiltered(false);
    }
  }

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
    const fetchAll = async () => {
      const res = await API.get(`/food/all`);
      if (res.data[0].name) {
        setAllFood(res.data);
      }
    }
    fetchAll();
  }, []);

  useEffect(() => {
    const setList = async (menu) => {
      if (typeof allFood === "object" && allFood.length > 0) {
        const tempFood = allFood.filter(item => item.mainCategory === menu);
        const temp = sortSubCategory(tempFood);
        setSubCategoryList(temp);
        setMaxPrice(sortMaxPrice(tempFood));
        setSubCategory(temp[0]);
        setTabValue(0);
      } else {
        const res = await API.get(`/food/main/${menu}`);
        if (res.data[0].name) {
          const temp = sortSubCategory(res.data);
          setSubCategoryList(temp);
          setMaxPrice(sortMaxPrice(res.data));
          setSubCategory(temp[0]);
          setTabValue(0);
        }
      }
    }
    setList(menu);
  }, [menu]);

  useEffect(() => {
    const setList = async () => {
      const res = await API.get(`/food/sub/${subCategory}`);
      if (res.data[0].name) {
        setMaxPrice(sortMaxPrice(res.data));
        if (isFiltered) {
          setIsFiltered(false);
          setSliderValue([0, sortMaxPrice(res.data)]);
        }
        setFoodList(res.data);
      }
    }
    if (subCategory) setList();
  }, [subCategory]);

  return (
    <>
      {foodList.length !== 0 &&
        <CardList
          data={isFiltered ? filteredFoodList : foodList}
          subCategoryList={subCategoryList}
          maxPrice={maxPrice}
          setSubCategory={setSubCategory}
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          sliderValue={sliderValue}
          setSliderValue={handleSliderChange}
          handleSearchChange={handleSearchChange}
          handleSwitchChange={handleSwitchChange}
          setCheckedVega={setCheckedVega}
          setCheckedSpicy={setCheckedSpicy}
        />
      }
    </>
  )
};

export default Menu;

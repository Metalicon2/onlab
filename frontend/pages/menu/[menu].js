import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardList from "../../components/Cards/CardList";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const appetizers = [
  {
    name: "1",
    desc: "1",
  },
  {
    name: "2",
    desc: "2",
  },
  {
    name: "3",
    desc: "3",
  },
];
const maindishes = [
  {
    name: "1",
    desc: "1",
  },
  {
    name: "2",
    desc: "2",
  },
  {
    name: "3",
    desc: "3",
  },
  {
    name: "4",
    desc: "4",
  },
];
const desserts = [
  {
    name: "1",
    desc: "1",
  },
  {
    name: "2",
    desc: "2",
  },
  {
    name: "3",
    desc: "3",
  },
  {
    name: "4",
    desc: "4",
  },
  {
    name: "5",
    desc: "5",
  },
  {
    name: "6",
    desc: "6",
  },
  {
    name: "7",
    desc: "7",
  },
  {
    name: "8",
    desc: "8",
  },
  {
    name: "9",
    desc: "9",
  },
  {
    name: "10",
    desc: "10",
  },
];

const useStyle = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Menu = () => {
  const [foodList, setFoodList] = useState([]);
  const { menu } = useRouter().query;

  useEffect(() => {
    switch (menu) {
      case "appetizers":
        return setFoodList(appetizers);
      case "maindishes":
        return setFoodList(maindishes);
      case "desserts":
        setFoodList(desserts);
    }
  }, [menu]);

  return <CardList data={foodList.length !== 0 ? foodList : []} />;
};

export default Menu;

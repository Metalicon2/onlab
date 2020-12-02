import Card from "./Card";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DaySelector from "./DaySelector";

const useStyle = makeStyles(() => ({
  root: {
    flex: 4,
  },
  cardListRoot: {
    height: "808px",
    overflowY: "auto",
  },
  cardList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    height: "100%",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    "& > div": {
      alignSelf: "center",
      width: "80px",
      height: "80px",
    },
  },
  daySelector: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "65px",
    background: "rgb(63,81,181)",
  },
}));

const CardList = ({
  loaded,
  foodList,
  filteredFoodList,
  isFiltered,
  subCategory,
  day,
  user
}) => {
  const classes = useStyle();

  const getProperList = () =>
    (isFiltered ? filteredFoodList : foodList)
      .filter((item) => item.subCategory === subCategory)
      .filter((item) => item.availableDate === day);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.cardListRoot}>
          {loaded ? (
            <div className={classes.cardList}>
              {console.log(getProperList())}
              {getProperList().map((item, index) => (
                <Card
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  key={index}
                  color={item.color}
                  src={item.src}
                  id={item.id}
                  availableDate={item.availableDate}
                  userId={user.id}
                />
              ))}
            </div>
          ) : (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )}
        </div>
        <div className={classes.daySelector}>
          <DaySelector />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodList: state.foodList,
    filteredFoodList: state.filteredFoodList,
    isFiltered: state.isFiltered,
    subCategory: state.subCategory,
    day: state.day,
    user: state.user
  };
};

export default connect(mapStateToProps, null)(CardList);

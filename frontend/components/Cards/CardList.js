import Card from "./Card";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(() => ({
  root: {
    flex: 4,
    height: "805px",
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
}));

const CardList = ({ loaded, foodList, filteredFoodList, isFiltered, subCategory }) => {
  const classes = useStyle();

  const getProperList = () =>
    (isFiltered ? filteredFoodList : foodList).filter(
      (item) => item.subCategory === subCategory
    );

  return (
    <>
      <div className={classes.root}>
        {loaded ? (
          <div className={classes.cardList}>
            {getProperList().map((item, index) => (
              <Card
                name={item.name}
                desc={item.description}
                price={item.price}
                key={index}
                key={index}
                color={item.color}
                src={item.src}
                id={item.id}
              />
            ))}
          </div>
        ) : (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    foodList: state.foodList,
    filteredFoodList: state.filteredFoodList,
    isFiltered: state.isFiltered,
    loaded: state.loaded,
    subCategory: state.subCategory
  };
};

export default connect(mapStateToProps, null)(CardList);

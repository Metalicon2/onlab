import {connect} from "react-redux";
import {TextField} from "@material-ui/core"
import {setIsFilteredAction, setFilteredFoodListAction} from "../../redux/actions";

const SearchField = ({setIsFilteredAction, setFilteredFoodListAction, foodList}) => {

    const handleSearchChange = (value) => {
        if (value.length) {
            setIsFilteredAction(true);
            setFilteredFoodListAction(foodList.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setIsFilteredAction(false);
        }
    }

    return (
        <TextField id="standard-basic" label="Search" onChange={(e) => handleSearchChange(e.target.value)} />
    );
}

const mapStateToProps = (state) => {
    return {
        foodList: state.foodList
    }
}

const mapDispatchToProps = {
    setIsFilteredAction: setIsFilteredAction,
    setFilteredFoodListAction: setFilteredFoodListAction
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
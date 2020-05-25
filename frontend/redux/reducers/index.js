import {combineReducers} from "redux";

const userReducer = (state = {}, action) => {
    switch(action.type){
        case "SET_USER" : return action.payload;
        case "DELETE_USER": return action.payload;
        default: return state;
    }
}

const cartReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_TO_CART": return [...state, action.payload];
        case "RESET_CART": return [];
        case "DELETE_FROM_CART": {
            const tempArray = [...state];
            const searchedIndex = tempArray.findIndex(element => element.name === action.payload.name);
            tempArray.splice(searchedIndex, 1);
            return tempArray;
        }
        case "UPDATE_CART": {
            const tempArray = [...state];
            const searchedOldIndex = tempArray.findIndex(element => element.name === action.payload.oldItem.name);
            tempArray[searchedOldIndex] = action.payload.newItem;
            return tempArray;
        }
        default: return state;
    }
}

const maxPriceReducer = (state = 0, action) => {
    switch(action.type){
        case "SET_MAX_PRICE": return action.payload;
        default: return state;
    }
}

const foodListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_FOODLIST": return action.payload;
        default: return state;
    }
}

const filteredFoodListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_FILTERED_FOODLIST": return action.payload;
        default: return state;
    }
}

const isFilteredReducer = (state = false, action) => {
    switch(action.type){
        case "SET_IS_FILTERED": return action.payload;
        default: return state;
    }
}

const subCategoryReducer = (state = "", action) => {
    switch(action.type){
        case "SET_SUBCATEGORY": return action.payload;
        default: return state;
    }
}

const tabValueReducer = (state = 0, action) => {
    switch(action.type){
        case "SET_TABVALUE": return action.payload;
        default: return state;
    }
}

const subCategoryListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_SUBCATEGORYLIST": return action.payload;
        default: return state;
    }
}

const sliderValueReducer = (state = [0, 100], action) => {
    switch(action.type){
        case "SET_SLIDERVALUE": return action.payload;
        default: return state;
    }
}

const vegaReducer = (state = false, action) => {
    switch(action.type){
        case "SET_VEGA": return action.payload;
        default: return state;
    }
}

const spicyReducer = (state = false, action) => {
    switch(action.type){
        case "SET_SPICY": return action.payload;
        default: return state;
    }
}

const loadedReducer = (state = false, action) => {
    switch(action.type){
        case "SET_LOADED": return action.payload;
        default: return state;
    }
}

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    maxPrice: maxPriceReducer,
    foodList: foodListReducer,
    filteredFoodList: filteredFoodListReducer,
    isFiltered: isFilteredReducer,
    subCategory: subCategoryReducer,
    tabValue: tabValueReducer,
    subCategoryList: subCategoryListReducer,
    sliderValue: sliderValueReducer,
    vegaChecked: vegaReducer,
    spicyChecked: spicyReducer,
    loaded: loadedReducer
});
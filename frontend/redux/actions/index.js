export const addUserAction = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const deleteUserAction = () => {
    return {
        type: "DELETE_USER",
        payload: {}
    }
}

export const addToCartAction = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item
    }
}

export const deleteFromCartAction = (item) => {
    return {
        type: "DELETE_FROM_CART",
        payload: item
    }
}

export const updateCartAction = (oldItem, newItem) => {
    return {
        type: "UPDATE_CART",
        payload: {
            oldItem: oldItem,
            newItem: newItem
        }
    }
}

export const setMaxPriceAction = (value) => {
    return {
        type: "SET_MAX_PRICE",
        payload: value
    }
}

export const setFoodListAction = (array) => {
    return {
        type: "SET_FOODLIST",
        payload: array
    }
}

export const setFilteredFoodListAction = (array) => {
    return {
        type: "SET_FILTERED_FOODLIST",
        payload: array
    }
}

export const setIsFilteredAction = (value) => {
    return {
        type: "SET_IS_FILTERED",
        payload: value
    }
}

export const setSubCategoryAction = (value) => {
    return {
        type: "SET_SUBCATEGORY",
        payload: value
    }
}

export const setTabValueAction = (value) => {
    return {
        type: "SET_TABVALUE",
        payload: value
    }
}

export const setSubCategoryListAction = (array) => {
    return {
        type: "SET_SUBCATEGORYLIST",
        payload: array
    }
}

export const setSliderValueAction = (array) => {
    return {
        type: "SET_SLIDERVALUE",
        payload: array
    }
}

export const setCheckedVegaAction = (value) => {
    return {
        type: "SET_VEGA",
        payload: value
    }
}

export const setCheckedSpicyAction = (value) => {
    return {
        type: "SET_SPICY",
        payload: value
    }
}

export const resetCartAction = () => {
    return {
        type: "RESET_CART"
    }
}
import {createStore} from "redux";
import reducers from "./reducers";

const store = createStore(
    reducers, /* preloadedState, */
 +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;
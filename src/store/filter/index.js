import constants from "utils/constants";
import { CHANGE_FILTER } from "./actionNames";

const getInitialState = () => ({
  filter: window.location.hash || constants.all
});

const filterReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.data
      };

    default:
      return state;
  }
};

export default filterReducer;

import constants from "utils/constants";
import { CHANGE_FILTER } from "./actionNames";

const hash = () => {
  if (window.location.hash !== constants.ACTIVE
    && window.location.hash !== constants.COMPLETED) {
    window.location.hash = constants.ALL;
  }
  return window.location.hash;
};

const getInitialState = () => ({
  filter: hash()
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

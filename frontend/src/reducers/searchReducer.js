// import isEmpty from "../validation/is-empty";

import { SET_BOOKS } from "../actions/types";

const initialState = {
  books: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    default:
      return state;
  }
}

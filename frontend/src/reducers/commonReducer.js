import { GET, POST, PUT, GENERATE_SUCCESS } from "../actions/types";

const initialState = {
  state: [],
  report: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET:
      return {
        ...state,
        state: action.payload,
      };
    case GENERATE_SUCCESS:
      return {
        ...state,
        report: action.payload,
      };
    case POST:
      return {
        report: [...state, action.payload],
      };
    case PUT:
      return {
        ...state, //Any current state
        state: state.state.map((state) =>
          state.si_conf_no === action.payload.si_conf_no
            ? action.payload
            : state
        ),
      };
    default:
      return state;
  }
}

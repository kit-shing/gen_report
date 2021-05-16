import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GENERATE_SUCCESS, GENERATE_FAIL } from "./types";

//Get info for display
export const getInfo = (id) => (dispatch) => {
  // Request body

  axios
    .get(`/api/generate/${id}/`)
    .then((res) => {
      dispatch(createMessage({ alert_success: "Get info successful!" }));
      dispatch({
        type: GENERATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

//Generate report
export const generate = (id, data) => (dispatch) => {
  // Request body
  axios
    .put(`/api/generate/${id}/`, data)
    .then((res) => {
      dispatch(createMessage({ alert_success: "File generated!" }));
      dispatch({
        type: GENERATE_SUCCESS,
        payload: res.data,
      });
      console.log("success");
      window.location.reload();
      return "success";
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      //dispatch({
      //  type: GENERATE_FAIL,
      //});
      return "fail";
    });
};

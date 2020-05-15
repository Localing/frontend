export const SET_POINTS = "SET_POINTS";
export const ADD_POINTS = "ADD_POINTS";

export const setPoints = points => {
  return dispatch => {
        dispatch({
          type: SET_POINTS,
          payload: { points }
        });
    }
};

export const addPoints = points => {
  return dispatch => {
    dispatch({
      type: ADD_POINTS,
      payload: { points }
    })
  }
}
import axios from "axios";
import {
  FETCH_DATA_NOTIFICATION_FAILURE,
  FETCH_DATA_NOTIFICATION_REQUEST,
  FETCH_DATA_NOTIFICATION_SUCCESS,
} from "./constants";
const fetchingData = () => {
  return {
    type: FETCH_DATA_NOTIFICATION_REQUEST,
  };
};
const fetchDataSuccess = ({ data }) => {
  return {
    type: FETCH_DATA_NOTIFICATION_SUCCESS,
    payload: data,
  };
};
const fetchDataFailure = ({ error }) => {
  return {
    type: FETCH_DATA_NOTIFICATION_FAILURE,
    error: error,
  };
};

export const fetchNotifications = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchingData());
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/notifications/get-nums-notifications-unread`
      );
      dispatch(
        fetchDataSuccess({
          data: res.data.data,
        })
      );
    } catch (err) {
      dispatch(fetchDataFailure({ error: err }));
    }
  };
};
export const updateUnReadNotifications = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchingData());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/notifications/update-notifications-unread`
      );
      dispatch(
        fetchDataSuccess({
          data: res.data.data,
        })
      );
    } catch (err) {
      dispatch(fetchDataFailure({ error: err }));
    }
  };
};

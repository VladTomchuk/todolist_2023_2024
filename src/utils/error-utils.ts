import { Dispatch } from "redux";
import { ResponseDataType } from "../api/todolists-api";
import { appActions } from "../state/reducers/appReducer";

export const handleServerAppError = <D>(
  dispatch: Dispatch,
  data: ResponseDataType<D>
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
  return;
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(appActions.setAppError({ error: error.message }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

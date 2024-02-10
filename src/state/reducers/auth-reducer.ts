import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, LoginParamsType } from "../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { AppThunk } from "../store";
import { appActions } from "./appReducer";

const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

/////////THUNK CREATORS /////////
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    authApi
      .login(data)
      .then((resp) => {
        if (resp.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(dispatch, resp.data);
          dispatch(appActions.setAppStatus({ status: "failed" }));
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logOutTC = (): AppThunk => (dispatch) => {
  authApi
    .logout()
    .then((resp) => {
      if (resp.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(dispatch, resp.data);
        dispatch(appActions.setAppStatus({ status: "failed" }));
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

////////TYPES//////////
export type setIsLoggedInType = ReturnType<typeof authActions.setIsLoggedIn>;

export const authReducer = slice.reducer;
export const authActions = slice.actions;

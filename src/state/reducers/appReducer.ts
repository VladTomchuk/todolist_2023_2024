import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authApi } from "../../api/todolists-api";
import { handleServerNetworkError } from "../../utils/error-utils";
import { authActions } from "./auth-reducer";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    initialized: false,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error;
    },
    isInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.initialized = action.payload.isInitialized;
    },
  },
});

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authApi
    .me()
    .then((resp) => {
      if (resp.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      } else {
      }
      dispatch(appActions.isInitialized({ isInitialized: true }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const appReducer = slice.reducer;
export const appActions = slice.actions;

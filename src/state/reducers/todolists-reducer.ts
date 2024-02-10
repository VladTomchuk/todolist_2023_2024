import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { TodolistsApi } from "../../api/todolists-api";
import { handleServerNetworkError } from "../../utils/error-utils";
import { TodolistType } from "../types";
import { RequestStatusType, appActions } from "./appReducer";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ todolistId: string; newFilter: FilterValuesType }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      state[index].filter = action.payload.newFilter;
    },
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistTitleAC(
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      state[index].title = action.payload.title;
    },
    setTodolistsAC(
      state,
      action: PayloadAction<{ todolists: TodolistType[] }>
    ) {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ todolistId: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      state[index].entityStatus = action.payload.status;
    },
  },
});
export const {
  changeTodolistFilterAC,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  setTodolistsAC,
  changeTodolistEntityStatusAC,
} = slice.actions;
export const todolistsReducer = slice.reducer;

////////THUNK CREATORS////////
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  TodolistsApi.getTodolists()
    .then((resp) => {
      dispatch(setTodolistsAC({ todolists: resp.data }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const removeTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(changeTodolistEntityStatusAC({ todolistId, status: "loading" }));
    TodolistsApi.deleteTodolist(todolistId)
      .then((resp) => {
        dispatch(removeTodolistAC({ todolistId }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  TodolistsApi.postTodolist(title)
    .then((resp) => {
      const action = addTodolistAC({ todolist: resp.data.data.item });
      dispatch(action);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    TodolistsApi.updateTodolist(todolistId, title)
      .then((resp) => {
        const action = changeTodolistTitleAC({ todolistId, title });
        dispatch(action);
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

////////TYPES/////////
export type TodolistsActionType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | changeTodolistFilterACType
  | SetTodolistsACType
  | changeTodolistEntityStatusACType;

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>;
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
type changeTodolistEntityStatusACType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

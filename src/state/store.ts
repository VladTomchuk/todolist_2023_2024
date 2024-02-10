import { configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import { appReducer } from "./reducers/appReducer";
import { authReducer } from "./reducers/auth-reducer";
import { tasksReducer } from "./reducers/tasks-reducer";
import { todolistsReducer } from "./reducers/todolists-reducer";
import { ThunkAction } from "redux-thunk";

// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;

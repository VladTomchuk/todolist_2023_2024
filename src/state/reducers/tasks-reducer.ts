import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodolistsApi, UpdateTaskModelType } from "../../api/todolists-api";
import { TasksStateType } from "../../trash/App";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { AppThunk } from "../store";
import { TaskStatuses, TaskType } from "../types";

import { appActions } from "./appReducer";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolists-reducer";

const initialState: TasksStateType = {};

export const fetchTasksThunkTC = createAsyncThunk(
  "tasks/fetchTasks",
  (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
    return TodolistsApi.getTasks(todolistId).then((resp) => {
      const tasks = resp.data.items;
      thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { tasks, todolistId };
    });
  }
);

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },

    removeTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = state[action.payload.todolistId].findIndex(
        (t) => t.id === action.payload.taskId
      );
      if (index > -1) tasks.splice(index, 1);
    },

    changeTaskTitleAC(
      state,
      action: PayloadAction<{
        taskId: string;
        newTitle: string;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = state[action.payload.todolistId].findIndex(
        (t) => t.id === action.payload.taskId
      );
      if (index > -1) tasks[index].title = action.payload.newTitle;
    },

    changeTaskStatusAC(
      state,
      action: PayloadAction<{
        taskId: string;
        status: TaskStatuses;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) tasks[index].status = action.payload.status;
    },

    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{
        taskId: string;
        status: any;
        todolistId: string;
      }>
    ) {
      const tasks = state[action.payload.todolistId];
      const index = state[action.payload.todolistId].findIndex(
        (t) => t.id === action.payload.taskId
      );
      if (index > -1) {
        tasks[index].status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = [];
      });
    });
    builder.addCase(fetchTasksThunkTC.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    });
  },
});
export const tasksReducer = slice.reducer;
export const {
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  //setTasksAC,
  changeTaskEntityStatusAC,
} = slice.actions;

/////////THUNK CREATORS /////////
// export const fetchTasksThunkTC_ = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     TodolistsApi.getTasks(todolistId)
//         .then((resp) => {
//
//             const tasks = resp.data.items
//             const action = setTasksAC({todolistId, tasks})
//             dispatch(action)
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    TodolistsApi.deleteTask(taskId, todolistId)
      .then((resp) => {
        if (resp.data.resultCode === 0) {
          dispatch(removeTaskAC({ taskId, todolistId }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(dispatch, resp.data);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const createTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    TodolistsApi.createTask(todolistId, title)
      .then((resp) => {
        if (resp.data.resultCode === 0) {
          const task = resp.data.data;
          const action = addTaskAC({ task });
          dispatch(action);
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(dispatch, resp.data);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskFieldTC =
  (
    todolistId: string,
    taskId: string,
    updatedFields: Partial<UpdateTaskModelType>
  ): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);

    if (!task) {
      console.warn("Task is not found in state!");
      return;
    }

    const model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...updatedFields, // Обновляем только переданные поля
    };

    dispatch(appActions.setAppStatus({ status: "loading" }));

    TodolistsApi.updateTask(todolistId, taskId, model)
      .then((resp) => {
        if (resp.data.resultCode === 0) {
          if ("title" in updatedFields) {
            dispatch(
              changeTaskTitleAC({
                todolistId,
                taskId,
                newTitle: updatedFields.title!,
              })
            );
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
          }
          if ("status" in updatedFields) {
            dispatch(
              changeTaskStatusAC({
                taskId,
                status: updatedFields.status!,
                todolistId,
              })
            );
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
          }
        } else {
          handleServerAppError(dispatch, resp.data);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

////////TYPES//////////
// export type TasksActionType =
//     ReturnType<typeof setTasksAC> |
//     ReturnType<typeof removeTaskAC> |
//     ReturnType<typeof addTaskAC> |
//     ReturnType<typeof changeTaskStatusAC> |
//     ReturnType<typeof changeTaskTitleAC> |
//     AddTodolistACType | // typing of common Action creator
//     RemoveTodolistACType | // typing of common Action creator
//     SetTodolistsACType

import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../types";
import {TasksStateType} from "../../App";
import {Dispatch} from "redux";
import {TodolistsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {AppRootStateType} from "../store";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.title,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order: 0,
                addedDate: '',
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id
                    ? {...t, status: action.payload.status}
                    : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        case "SET-TODOLISTS": {
            const CopyState = {...state}
            action.todolists.forEach(t => {
                CopyState[t.id] = []
            })
            return CopyState
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

/////ACTION CREATORS////////
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {id, status, todolistId}
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, newTitle}
    } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

/////////THUNK CREATORS /////////
export const fetchTasksThunkTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        TodolistsApi.getTasks(todolistId)
            .then((resp) => {

                const tasks = resp.data.items
                const action = setTasksAC(todolistId, tasks)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        TodolistsApi.deleteTask(taskId, todolistId)
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, resp.data)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        TodolistsApi.createTask(todolistId, title)
            .then(resp => {
                if (resp.data.resultCode === 0) {
                    const action = addTaskAC(todolistId, title)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, resp.data)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const updateTaskFieldTC = (
    todolistId: string,
    taskId: string,
    updatedFields: Partial<UpdateTaskModelType>
) => (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);

    if (!task) {
        console.warn('Task is not found in state!');
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

    dispatch(setAppStatusAC('loading'))

    TodolistsApi.updateTask(todolistId, taskId, model)
        .then((resp) => {
            if (resp.data.resultCode === 0) {
                if ('title' in updatedFields) {
                    dispatch(changeTaskTitleAC(todolistId, taskId, updatedFields.title!));
                    dispatch(setAppStatusAC('succeeded'))
                }
                if ('status' in updatedFields) {
                    dispatch(changeTaskStatusAC(taskId, updatedFields.status!, todolistId));
                    dispatch(setAppStatusAC('succeeded'))
                }
            } else {
                handleServerAppError(dispatch, resp.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
};

////////TYPES//////////
export type TasksActionType =
    SetTasksActionType |
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistACType | // typing of common Action creator
    RemoveTodolistACType | // typing of common Action creator
    SetTodolistsACType

export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string,
    tasks: TaskType[]
}
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export type ThunkDispatch = Dispatch<TasksActionType | SetAppStatusActionType | SetAppErrorActionType>
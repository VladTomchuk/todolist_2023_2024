import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./types";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {TodolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType} from "./store";


export type TasksActionType =
    SetTasksActionType |
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistACType | // typing of common Action creator
    RemoveTodolistACType | // typing of common Action creator
    SetTodolistsACType

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
            console.log({action})
            console.log(state[action.todolistId])
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

export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string,
    tasks: TaskType[]
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    // console.log('taskId' + id)
    // console.log('todolistId ' + todolistId)
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        title, todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id, status, todolistId
        }
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId, taskId, newTitle
        }
    } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS', todolistId, tasks
    } as const
}
export const fetchTasksThunkTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.getTasks(todolistId)
            .then((resp) => {
                const tasks = resp.data.items
                const action = setTasksAC(todolistId, tasks,)
                dispatch(action)
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.deleteTask(taskId, todolistId)
            .then(resp => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}
export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.createTask(todolistId, title)
            .then(resp => {
                const action = addTaskAC(todolistId, title)
                dispatch(action)
            })
    }
}

// export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) => {
//
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             console.warn('task is not found in state!')
//             return
//         }
//         const model: UpdateTaskModelType = {
//             title: newTitle,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//         }
//         TodolistsApi.updateTask(todolistId, taskId, model)
//             .then(resp => {
//                 const action = changeTaskTitleAC(todolistId, taskId, newTitle)
//                 dispatch(action)
//             })
//     }
// }
//
// export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
//
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             console.warn('task is not found in state!')
//             return
//         }
//         const model: UpdateTaskModelType = {
//             title: task.title,
//             description: task.description,
//             status: status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//         }
//         TodolistsApi.updateTask(todolistId, taskId, model)
//             .then(resp => {
//                 const action = changeTaskStatusAC( taskId, status,todolistId)
//                 dispatch(action)
//             })
//     }
// }
export const updateTaskFieldTC = (
    todolistId: string,
    taskId: string,
    updatedFields: Partial<UpdateTaskModelType>
) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

    TodolistsApi.updateTask(todolistId, taskId, model)
        .then((resp) => {
            if ('title' in updatedFields) {
                dispatch(changeTaskTitleAC(todolistId, taskId, updatedFields.title!));
            }
            if ('status' in updatedFields) {
                dispatch(changeTaskStatusAC(taskId, updatedFields.status!, todolistId));
            }
            // Добавьте обработку других полей по аналогии
        })
        .catch((error) => {
            // Обработка ошибок
            console.error('Failed to update task:', error);
        });
};

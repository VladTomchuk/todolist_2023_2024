import {TasksStateType} from "../../trash/App";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: initialStateType = {
    isLoggedIn: false
}
export const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

/////ACTION CREATORS////////
export const setIsLoggedInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

/////////THUNK CREATORS /////////
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((resp) => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, resp.data)
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    authApi.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, resp.data)
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
////////TYPES//////////
export type ActionsType = setIsLoggedInACType
type initialStateType = {
    isLoggedIn: boolean
}
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
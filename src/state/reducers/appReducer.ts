import {authApi} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC, setIsLoggedInACType} from "./auth-reducer";

const InitialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALED':
            return {...state, initialized: action.value}
        default:
            return state
    }
}

type ActionsType = SetAppErrorActionType | SetAppStatusActionType | isInitializedACType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type isInitializedACType = ReturnType<typeof isInitializedAC>

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const isInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALED', value} as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch<ActionsType | setIsLoggedInACType>) => {
    authApi.me()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))

            } else {

            }
            dispatch(isInitializedAC(true))
        })
}
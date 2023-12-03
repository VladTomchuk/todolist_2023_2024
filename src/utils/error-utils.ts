import {setAppErrorAC, setAppStatusAC} from "../state/reducers/appReducer";
import {ThunkDispatch} from "../state/reducers/tasks-reducer";
import {ResponseDataType} from "../api/todolists-api";

export const handleServerAppError = <D>(dispatch: ThunkDispatch, data: ResponseDataType<D>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
    return;
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ThunkDispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
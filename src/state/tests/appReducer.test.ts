import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "../reducers/appReducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        initialized: false
    }
})
test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})
test('correct error should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('more than 101 symbols'))

    expect(endState.error).toBe('more than 101 symbols')
})
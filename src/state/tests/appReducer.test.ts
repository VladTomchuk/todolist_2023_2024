import {
  appActions,
  appReducer,
  InitialStateType,
} from "../reducers/appReducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    initialized: false,
  };
});
test("correct status should be set", () => {
  const endState = appReducer(
    startState,
    appActions.setAppStatus({ status: "loading" })
  );

  expect(endState.status).toBe("loading");
});
test("correct error should be set", () => {
  const endState = appReducer(
    startState,
    appActions.setAppError({ error: "more than 101 symbols" })
  );

  expect(endState.error).toBe("more than 101 symbols");
});

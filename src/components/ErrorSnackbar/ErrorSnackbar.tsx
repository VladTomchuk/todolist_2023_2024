import { Alert } from "@mui/lab";
import Box from "@mui/material/Box";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppRootStateType } from "../../state/store";
import { appActions } from "../../state/reducers/appReducer";

export function ErrorSnackbar() {
  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.app.error
  );
  const dispatch = useDispatch();
  const isOpen = error !== null;

  const handleClose = (
    event?: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({ error: null }));
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={8000}
      >
        <Alert onClose={handleClose} severity={"error"}>
          <span>{error}</span>
        </Alert>
      </Snackbar>
    </Box>
  );
}

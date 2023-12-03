import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo} from "react";
import {RequestStatusType} from "../state/reducers/appReducer";

type PropsType = {
    callback: () => void
    entityStatus?: RequestStatusType
}
export const RemoveSuperButton = memo((props: PropsType) => {
    return (
        <IconButton size="small" onClick={props.callback} aria-label="delete"
                    disabled={props.entityStatus === 'loading'}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    )
})
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo} from "react";

type PropsType = {
    callback: () => void
}
export const RemoveSuperButton = memo((props: PropsType) => {
    return (
        <IconButton size="small" onClick={props.callback} aria-label="delete">
            <DeleteIcon fontSize="small"/>
        </IconButton>
    )
})
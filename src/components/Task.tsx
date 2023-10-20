import React from "react";
import {TaskType} from "../App";
import EditableSpan from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SuperCheckbox from "./SuperCheckbox";

type TaskPropsType = {
    removeTask: () => void
    changeIsDoneStatus: (isDone: boolean) => void
    callback: (newTitle: string) => void
} & TaskType

export const Task = (props: TaskPropsType) => {
    const onChangeValueIsDoneHandler = (isDone:boolean) => {
        props.changeIsDoneStatus(isDone)
    }
    return (
        <ul>
            <li key={props.id} className={props.isDone ? "taskDone" : "task"}>

                <SuperCheckbox
                    isDone={props.isDone}
                    callback={onChangeValueIsDoneHandler}
                />

                <EditableSpan
                    oldTitle={props.title}
                    callback={props.callback}
                />

                <IconButton size="small" onClick={props.removeTask} aria-label="delete">
                    <DeleteIcon fontSize="small"/>
                </IconButton>

            </li>
        </ul>
    )
}
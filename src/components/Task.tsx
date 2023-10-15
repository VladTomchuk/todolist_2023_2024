import React from "react";
import {TaskType} from "../App";
import EditableSpan from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import {lightBlue} from '@mui/material/colors';

type TaskPropsType = {
    removeTask: () => void
    changeIsDoneStatus: (isDone: boolean) => void
    callback: (newTitle: string) => void
} & TaskType

export const Task = (props: TaskPropsType) => {
    const onChangeValueIsDoneHandler = () => {
        props.changeIsDoneStatus(props.isDone)
    }

    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const sx = {
        color: lightBlue[900],
        '&.Mui-checked': {
            color: lightBlue[800],
        },
    }
    return (
        <ul>

            <li key={props.id} className={props.isDone ? "taskDone" : "task"}>
                <Checkbox
                    checked={props.isDone}
                    onChange={onChangeValueIsDoneHandler}
                    {...label}
                    defaultChecked
                    sx={sx}
                />
                <EditableSpan oldTitle={props.title} callback={props.callback}/>
                <IconButton size="small" onClick={props.removeTask} aria-label="delete">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </li>
        </ul>
    )
}
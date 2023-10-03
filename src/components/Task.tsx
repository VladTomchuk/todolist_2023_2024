import React, {ChangeEvent} from "react";
import {TaskType} from "../App";

type TaskPropsType = {
    removeTask: () => void
    changeIsDoneStatus: (isDone: boolean) => void
} & TaskType
export const Task = (props: TaskPropsType) => {
    const onChangeValueIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeIsDoneStatus(props.isDone)
    }
    return (
        <ul>
            <li key={props.id} className={props.isDone ? "taskDone" : "task"}>
                <input
                    type="checkbox"
                    checked={props.isDone}
                    onChange={onChangeValueIsDoneHandler}
                />
                <span>{props.title}</span>
                <button onClick={props.removeTask}>✖️</button>
            </li>
        </ul>
    )
}
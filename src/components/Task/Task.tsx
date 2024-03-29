import React, {useCallback} from "react";
import EditableSpan from "../EditableSpan/EditableSpan";
import SuperCheckbox from "../SuperCheckbox";
import {RemoveSuperButton} from "../RemoveSuperButton";
import {TaskStatuses, TaskType} from "../../state/types";


type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeIsDoneStatus: (taskId: string, status: TaskStatuses) => void
    updateTaskHandler: (taskId: string, newTitle: string) => void

} & TaskType

export const Task = React.memo((props: TaskPropsType) => {


    const onChangeValueIsDoneHandler = useCallback((status: TaskStatuses) => {
        props.changeIsDoneStatus(props.id, status)
    }, [props.changeIsDoneStatus, props.id])
    const updateCallback = useCallback((newTitle: string) => {
        props.updateTaskHandler(props.id, newTitle)
    }, [props.id])
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.id)
    }, [props.id])

    return (
        <ul>
            <li key={props.id} className={props.status === TaskStatuses.Completed ? "taskDone" : "task"}>

                <SuperCheckbox
                    status={props.status}
                    callback={onChangeValueIsDoneHandler}
                />

                <EditableSpan
                    oldTitle={props.title}
                    callback={updateCallback}
                />

                <RemoveSuperButton callback={removeTaskHandler}/>

            </li>
        </ul>
    )
})


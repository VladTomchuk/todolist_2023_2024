import React, {useCallback} from "react";
import {TaskType} from "../App";
import EditableSpan from "./EditableSpan";
import SuperCheckbox from "./SuperCheckbox";
import {RemoveSuperButton} from "./RemoveSuperButton";


type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeIsDoneStatus: (taskId: string, isDone: boolean) => void
    updateTaskHandler: (taskId: string, newTitle: string) => void

} & TaskType

export const Task = React.memo((props: TaskPropsType) => {
    //console.log('Task is rendered!')

    const onChangeValueIsDoneHandler = useCallback((isDone: boolean) => {
        props.changeIsDoneStatus(props.id, isDone)
    }, [props.changeIsDoneStatus, props.id])
    const updateCallback = useCallback((newTitle: string) => {
        props.updateTaskHandler(props.id, newTitle)
    }, [props.id])
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.id)
    }, [props.id])

    return (
        <ul>
            <li key={props.id} className={props.isDone ? "taskDone" : "task"}>

                <SuperCheckbox
                    isDone={props.isDone}
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


import React from "react";
import "../App.css";
import {Task} from "./Task";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import {FilterValuesType} from "../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../state/types";

type PropsType = {
    title: string
    todolistId: string
    currentFilterValue: FilterValuesType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    callback: (todolistId: string, title: string) => void
    changeIsDoneStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodoTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {
    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onComletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const onclickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const AddItemFormHandler = (newTitle: string) => {
        props.callback(props.todolistId, newTitle)
    }
    const updateTaskHandler = (taskId: string, newTitle: string) => {
        props.updateTask(props.todolistId, taskId, newTitle)

    }
    const updateTodoTitleHandler = (newTitle: string) => {
        props.updateTodoTitle(props.todolistId, newTitle)
    }
    return (
        <div className={"todolistContainer"}>
            <div className={"todoTitleDiv"}>
                <h3>
                    <EditableSpan
                        oldTitle={props.title}
                        callback={updateTodoTitleHandler}
                    />
                </h3>
                <IconButton onClick={onclickRemoveTodolistHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm callback={AddItemFormHandler}/>
            <div>
                {props.tasks.map((t: TaskType) => {
                    const removeTaskCallback = () => props.removeTask(props.todolistId, t.id)
                    const changeIsDoneStatusHandler = (taskId: string, status: TaskStatuses) => props.changeIsDoneStatus(props.todolistId, t.id, status)
                    const callbackHandler = (newTitle: string) => updateTaskHandler(t.id, newTitle)

                    return (
                        <Task
                            key={t.id}
                            {...t}
                            removeTask={removeTaskCallback}
                            changeIsDoneStatus={changeIsDoneStatusHandler}
                            updateTaskHandler={callbackHandler}
                        />
                    )
                })}
            </div>

            {/*BUTTONS OF FILTRATION */}
            <div>

                <Button
                    size="small"
                    variant={props.currentFilterValue === "all" ? "contained" : "outlined"}
                    onClick={onAllClickHandler}
                    color="primary">
                    All
                </Button>

                <Button
                    size="small"
                    variant={props.currentFilterValue === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}
                    color="warning">Active
                </Button>

                <Button
                    size="small"
                    variant={props.currentFilterValue === "completed" ? "contained" : "outlined"}
                    onClick={onComletedClickHandler}
                    color="success">
                    Completed
                </Button>

            </div>

        </div>
    )
}
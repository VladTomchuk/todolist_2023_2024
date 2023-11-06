import React, {useCallback} from "react";
import {TaskType, TodolistType} from "../App";
import "../App.css";
import {Task} from "./Task";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {SuperButton} from "./SuperButton";
import {RemoveSuperButton} from "./RemoveSuperButton";


type PropsType = {
    todolist: TodolistType
}

export const TodolistWithRedux = React.memo((props: PropsType) => {
    console.log('todolist is called')

    const {todolistId, title, filter} = props.todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[todolistId]
    )
    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'all'))
    }, [todolistId])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'active'))
    }, [todolistId])
    const onComletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'completed'))
    }, [todolistId])


    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => !t.isDone)
    }


    const AddItemFormHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }, [])
    const updateTodoTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [changeTodolistTitleAC, todolistId])
    const onclickRemoveTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolistId))
    }, [removeTodolistAC, todolistId])
    const updateTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [todolistId])
    const changeIsDoneStatusHandler = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [changeTaskStatusAC, todolistId])
    const removeTaskCallback = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [removeTaskAC, todolistId])

    return (
        <div className={"todolistContainer"}>
            <div className={"todoTitleDiv"}>
                <h3>
                    <EditableSpan
                        oldTitle={title}
                        callback={updateTodoTitleHandler}
                    />
                </h3>
                <RemoveSuperButton callback={onclickRemoveTodolistHandler}/>

            </div>
            <AddItemForm callback={AddItemFormHandler}/>
            <div>
                {tasks.map((t: TaskType) => {


                    return (
                        <Task
                            key={t.id}
                            {...t}
                            removeTask={removeTaskCallback}
                            changeIsDoneStatus={changeIsDoneStatusHandler}
                            updateTaskHandler={updateTaskHandler}
                        />
                    )
                })}
            </div>

            {/*BUTTONS OF FILTRATION */}
            <div>
                <SuperButton color={'primary'} name={'all'} filter={filter === 'all'} callback={onAllClickHandler}/>
                <SuperButton color={'warning'} name={'active'} filter={filter === 'active'}
                             callback={onActiveClickHandler}/>
                <SuperButton color={'success'} name={'completed'} filter={filter === 'completed'}
                             callback={onComletedClickHandler}/>
            </div>


        </div>
    )
})


import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {addTodolistAC} from "./state/todolists-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components/TodolistWithRedux";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodolistType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

const AppWithRedux = () => {
    console.log('App is called')

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodo = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

    const todolistsComponents = todolists.map(tl => {

            return (
                <Grid key={tl.todolistId} item>
                    <Paper elevation={12} style={{padding: '20px'}}>
                        <TodolistWithRedux
                            todolist={tl}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBarComponent/>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodo}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
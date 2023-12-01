import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    addTodolistAC, addTodolistsTC, fetchTodolistsTC,
    TodolistDomainType
} from "./state/reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components/TodolistWithRedux";
import {TaskType} from "./state/types";


export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

const AppWithRedux = () => {
    console.log('App is called')

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodo = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(addTodolistsTC(newTitle))
    }, [dispatch])

    const todolistsComponents = todolists.map(tl => {

            return (
                <Grid key={tl.id} item>
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

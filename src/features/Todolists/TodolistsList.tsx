import React, {useCallback, useEffect} from 'react';
import Paper from "@mui/material/Paper";
import {TodolistWithRedux} from "./Todolist/TodolistWithRedux";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTodolistsTC, fetchTodolistsTC, TodolistDomainType} from "../../state/reducers/todolists-reducer";
import Container from "@mui/material/Container";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

const TodolistsList = ({demo}: PropsType) => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        // @ts-ignore
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodo = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(addTodolistsTC(newTitle))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <Container>
            <Grid container style={{padding: '20px', marginBottom: '20px'}}>
                <AddItemForm callback={addTodo}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={12} style={{padding: '20px'}}>
                                <TodolistWithRedux todolist={tl} demo={demo}/>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
};

export default TodolistsList;
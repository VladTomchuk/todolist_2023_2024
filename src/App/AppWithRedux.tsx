import React, {useEffect} from 'react';
import './App.css';
import AppBarComponent from "../components/AppBar";
import {TaskType} from "../state/types";
import TodolistsList from "../features/Todolists/TodolistsList";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "../state/reducers/appReducer";


type TasksStateType = {
    [todolistId: string]: TaskType[]
}

type PropsType = {
    demo?: boolean
}

const AppWithRedux = ({demo = false, ...props}: PropsType) => {
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}><CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <BrowserRouter>
                <AppBarComponent/>
                <Switch>
                    <Route exact path={'/'} component={() => <TodolistsList demo={demo}/>}/>
                    <Route exact path={'/login'} component={Login}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default AppWithRedux;

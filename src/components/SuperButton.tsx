import Button from "@mui/material/Button";
import React, {ChangeEvent, memo, useCallback} from "react";
import {FilterValuesType} from "../AppWithRedux";


type SuperButtonPropsType = {
    callback: () => void
    filter: boolean
    name: string
    color: 'primary' | 'warning' | 'success'
}
export const SuperButton = memo((props: SuperButtonPropsType) => {
    // console.log('SuperButton is rendered!')

    return (
        <>
            <Button
                size="small"
                color={props.color}
                variant={props.filter ? "contained" : "outlined"}
                onClick={props.callback}>
                {props.name}
            </Button>
        </>
    )
})
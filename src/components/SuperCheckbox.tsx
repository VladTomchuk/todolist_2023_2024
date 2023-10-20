import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {lightBlue} from "@mui/material/colors";

type PropsType = {
    isDone: boolean
    callback: (isDone: boolean) => void
}

const SuperCheckbox = (props: PropsType) => {

    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const sx = {
        color: lightBlue[900],
        '&.Mui-checked': {
            color: lightBlue[800],
        },
    }

    const onChangeIsDoneStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }

    return (
        <Checkbox
            checked={props.isDone}
            onChange={onChangeIsDoneStatusHandler}
            {...label}
            defaultChecked
            sx={sx}
        />


    );
};

export default SuperCheckbox;
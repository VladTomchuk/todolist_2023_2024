import React, {ChangeEvent, memo} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {lightBlue} from "@mui/material/colors";
import {TaskStatuses} from "../state/types";


type PropsType = {
    status: TaskStatuses
    callback: (status: TaskStatuses) => void
}

const SuperCheckbox = memo((props: PropsType) => {
    //console.log('SuperCheckbox is rendered!')
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const sx = {
        color: lightBlue[900],
        '&.Mui-checked': {
            color: lightBlue[800],
        },
    }

    const onChangeIsDoneStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
            ? TaskStatuses.Completed
            : TaskStatuses.New
        props.callback(newStatus)
    }

    return (
        <Checkbox
            checked={props.status === TaskStatuses.Completed}
            onChange={onChangeIsDoneStatusHandler}
            {...label}
            sx={sx}
        />
    );
});

export default SuperCheckbox;
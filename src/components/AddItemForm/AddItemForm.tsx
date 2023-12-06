import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {RequestStatusType} from "../../state/reducers/appReducer";

type PropsType = {
    callback: (newTitle: string) => void
    entityStatus?: RequestStatusType
}
const AddItemForm = memo(({entityStatus, ...props}: PropsType) => {
    //console.log('addItemForm is called')
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTitleHandler = useCallback(() => {
        if (title.trim() !== '') {
            props.callback(title.trim())
            setTitle('')
        } else {
            setError('title is required')
        }
    }, [props.callback, title])
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter') {
            addTitleHandler()
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // error && setError(null)
        setTitle(e.currentTarget.value)
    }

    const styledButton = {
        maxWidth: "38px",
        maxHeight: "38px",
        minWidth: "38px",
        minHeight: "38px",
    }

    return (
        <div>

            <TextField
                disabled={entityStatus === 'loading'}
                error={!!error}
                size="small"
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeInputHandler}
                id="outlined-basic"
                label={error ? 'some error' : 'Type here...'} // как вывести текст типа ошибки ?
                variant="outlined"
                className={''}
            />

            <Button style={styledButton} variant="contained" size="small" onClick={addTitleHandler}
                    disabled={entityStatus === 'loading'}>+</Button>
            {/*{emptyValueError && <div>Please type title!</div>}*/}
        </div>
    );
})

export default AddItemForm;
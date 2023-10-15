import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callback: (newTitle: string) => void
}
const AddItemForm = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [emptyValueError, setEmptyValueError] = useState<boolean | string>(false)

    const addTitleHandler = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
        } else {
            setEmptyValueError(true)
        }
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTitleHandler()
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        emptyValueError && setEmptyValueError(false)
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
                error={!!emptyValueError}
                size="small"
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeInputHandler}
                id="outlined-basic"
                label={emptyValueError ? 'some error' : 'Type here...'} // как вывести текст типа ошибки ?
                variant="outlined"
                className={''}
            />

            <Button style={styledButton} variant="contained" size="small" onClick={addTitleHandler}>+</Button>
            {/*{emptyValueError && <div>Please type title!</div>}*/}
        </div>
    );
};

export default AddItemForm;
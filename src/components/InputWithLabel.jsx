import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './InputWithLabel.module.css';

const InputWithLabel = ({children, todoTitle, handleTitleChange}) => {
    const inputRef = useRef();

    const focusInputRefWhenTodoSubmittedWithKeyboard = () => {
        inputRef.current.focus();
    }

    useEffect(focusInputRefWhenTodoSubmittedWithKeyboard, []);
    
    return (
        <>
            <label htmlFor="todoTitle">{children}</label>&nbsp;&nbsp;
            <input 
                type="text" 
                name="title" 
                ref={inputRef} 
                id='todoTitle' 
                value={todoTitle} 
                onChange={handleTitleChange} 
                className={styles.inputField}
                autoFocus
            />
        </>
    );
};

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default InputWithLabel;
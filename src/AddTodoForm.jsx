import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import styles from './AddTodoForm.module.css';
import addSign from './assets/add-sign.svg';


const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState("");

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({id: Date.now(), title: todoTitle});
        setTodoTitle("");
    };

    return (
        <form onSubmit={handleAddTodo} className={styles.addTodoForm}>
            <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
            Title
            </InputWithLabel>
            &nbsp;&nbsp;
            <button type="submit"><img src={addSign} alt="Add item to to-do list." className={styles.addButtonImg} /></button>
        </form>
    );
};

export default AddTodoForm;
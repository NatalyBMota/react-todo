import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import trashCan from '../assets/trash-can.svg';

const TodoListItem = ({ id, todo, onRemoveTodo }) => {
    return (
        <li key={id} className={styles.listItem}>
            <span className={styles.todoListItem}>{todo}</span>
            &nbsp;&nbsp;
            <button type="button" onClick={() => {
                onRemoveTodo(id)
            }} className={styles.removeButton}>
                <img src={trashCan} alt="Remove item from to-do list." className={styles.trashCanIcon} />
                Remove
            </button>
        </li>
    );
}

TodoListItem.propTypes = {
    id: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    onRemoveTodo: PropTypes.func.isRequired
};

export default TodoListItem;
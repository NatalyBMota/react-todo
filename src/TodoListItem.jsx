const TodoListItem = ({id, todo}) => {
    return (
        <li key={id}>{todo}</li>
    );
}

export default TodoListItem;
import './App.css';
import { useState, useEffect} from 'react';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';

const App = () => {  
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: `{
        Authorization:Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}
      }`
    };
    try {

    } catch {
      
    }
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

  }

  useEffect(() => {
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     let existingTodo = JSON.parse(localStorage.getItem('savedTodoList') || '[]');
    //     const object = {
    //       data: {
    //         todoList: existingTodo,
    //       },
    //     };
    //     resolve(object);
    //   }, 2000);
    // })
    // .then(result => {
    //   let retrievedTodoList = result.data.todoList;
    //   setTodoList(retrievedTodoList);
    //   setIsLoading(false);
    // });
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const filteredTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(filteredTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (<p>Loading...</p>) : (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />)}
    </>
  );
};

export default App;

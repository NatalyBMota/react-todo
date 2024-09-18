import './App.css';
import { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import styles from './App.module.css';
import checkListImg from './assets/checklist.svg';

const App = () => {  
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        let errorResponse = `${response.status}`;
        throw new Error(errorResponse);
      }
      let data = await response.json();
      let todos = data.records.map(function(item) {
        const newTodo =  {
          id: item.id,
          title: item.fields.title,
        }
        return newTodo;
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = async (newTodo) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({"fields":
        {
          "title": newTodo.title,
        }
      })
    };

    const response = await fetch(url, options);
    const json = await response.json();
    
    setTodoList([...todoList, {
      id: json.id, 
      title: json.fields.title,
    }]);
  };

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    
    const options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        let errorResponse = `${response.status}`;
        throw new Error(errorResponse);
      }

      const filteredTodoList = todoList.filter((item) => item.id !== id);
      setTodoList(filteredTodoList);
    } catch (error) {
      return null;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={
          <>
            <nav>
              <Link to="/new" alt="Click here to create a new todo list.">New Todo List</Link>
              <Link to="https://icons8.com/icons/set/favicon" target="_blank" title="Where I got my fav (or favorite) icon from.">Fav Icons</Link>
            </nav>
            <main>
              <section>
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (<p>Loading...</p>) : (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />)}
              </section>
              <section>
                <img src={checkListImg} alt="Checklist." className={styles.checkListImg} />             
              </section>
            </main>
          </>
        }>
        </Route>
        <Route path="/new" exact element={
          <h1>New Todo List</h1>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

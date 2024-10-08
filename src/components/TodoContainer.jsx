import { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import styles from './TodoContainer.module.css';
import checkListImg from '../assets/checklist.svg';

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ascOrderToggle, setToggle] = useState(true);


  const sortAscCallBack = (objectA, objectB) => (objectA.title < objectB.title) ? -1 : (objectA.title > objectB.title) ? 1 : 0;

  const sortDescCallBack = (objectA, objectB) => (objectA.title < objectB.title) ? 1 : (objectA.title > objectB.title) ? -1 : 0;

  const toggleTitleSortOrder = () => {
    console.log("ascOrderToggle before", ascOrderToggle);
    let reverseValueOfSortOrder = !ascOrderToggle; 
    setToggle(reverseValueOfSortOrder);
    console.log("ascOrderToggle after", reverseValueOfSortOrder);
    console.log("Sorted Todo List", titleSortOrder(todoList, reverseValueOfSortOrder));
    setTodoList(titleSortOrder(todoList, reverseValueOfSortOrder));
  }

  const titleSortOrder = (listToSort, sortAscendingOrder) => {
    if (!sortAscendingOrder) {
      const sortedList = [...listToSort].sort(sortDescCallBack);
      return sortedList;
    } else {
      const sortedList = [...listToSort].sort(sortAscCallBack);
      return sortedList;
    }
  };

  const fetchData = async () => {
    const tableViewToGetQueryParam = "view=Grid%20view";
    const sortQueryParam = "sort%5B0%5D%5Bfield%5D=title";
    const sortAscending = "asc";
    const sortDirectionQueryParam = `sort%5B0%5D%5Bdirection%5D=${sortAscending}`;

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?${tableViewToGetQueryParam}&${sortQueryParam}&${sortDirectionQueryParam}`;
    
    
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
      
      setTodoList(titleSortOrder(todos, true));
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


  return (
    <>
      <nav>
        <Link to="/new" alt="Click here to create a new todo list.">New Todo List</Link>
        <Link to="https://icons8.com/icons/set/favicon" target="_blank" title="Where I got my fav (or favorite) icon from.">Fav Icons</Link>
        <button onClick={() => toggleTitleSortOrder()}>Toggle Sort Order</button>
      </nav>
      <main>
        <section>
          <h1>Todo List</h1>
          <AddTodoForm todoList={todoList} setTodoList={setTodoList} />
          {isLoading ? (<p>Loading...</p>) : (<TodoList todoList={todoList} setTodoList={setTodoList} />)}
        </section>
        <section>
          <img src={checkListImg} alt="Checklist." className={styles.checkListImg} />             
        </section>
      </main>
    </>
  );
};

export default TodoContainer;
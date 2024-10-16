import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import styles from './TodoContainer.module.css';
import checkListImg from '../assets/checklist.svg';

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscOrder, setisAscOrder] = useState(true);

  const sortAscCallBack = (objectA, objectB) => (objectA.title < objectB.title) ? -1 : (objectA.title > objectB.title) ? 1 : 0;

  const sortDescCallBack = (objectA, objectB) => (objectA.title < objectB.title) ? 1 : (objectA.title > objectB.title) ? -1 : 0;

  const toggleTitleSortOrder = () => {
    let reverseValueOfSortOrder = !isAscOrder; 
    setisAscOrder(reverseValueOfSortOrder);
    setTodoList(titleSortOrder(todoList, reverseValueOfSortOrder));
  }

  const titleSortOrder = useCallback((listToSort, sortAscendingOrder) => {
    if (!sortAscendingOrder) {
      const sortedList = [...listToSort].sort(sortDescCallBack);
      return sortedList;
    } else {
      const sortedList = [...listToSort].sort(sortAscCallBack);
      return sortedList;
    }
  }, []);
  
  const fetchData = useCallback(async () => {
    const tableViewToGetQueryParam = "view=Grid%20view";
    const sortQueryParam = "sort%5B0%5D%5Bfield%5D=title";
    const sortAscending = "asc";
    const sortDirectionQueryParam = `sort%5B0%5D%5Bdirection%5D=${sortAscending}`;
    const sortByProperty = `${sortQueryParam}&${sortDirectionQueryParam}`;

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?${tableViewToGetQueryParam}&${sortByProperty}`;
    
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
      
      const sortedResponseData = titleSortOrder(todos, isAscOrder);
      setTodoList(sortedResponseData);
      setIsLoading(false);

    } catch (error) {
      return null;
    }
  }, [isAscOrder, titleSortOrder, tableName]);

  useEffect(() => {
    fetchData();
  }, [tableName, fetchData]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = async (title) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    
    const options = {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({"fields":
        {
            "title": title.title,
        }
        })
    };

    const response = await fetch(url, options);
    const json = await response.json();

    let newList = [...todoList, {
        id: json.id, 
        title: json.fields.title,
    }];
    newList = titleSortOrder(newList, isAscOrder);
    setTodoList(newList);
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
        let responseError = `${response.status}`;
        throw new Error(responseError);
      }

      const json = await response.json();

      if (json.deleted !== true) {
        let deleteError = "Record not successfully deleted from table in AirTable account.";
        throw new Error(deleteError);
      }

      const filteredTodoList = todoList.filter((item) => item.id !== id);
      setTodoList(filteredTodoList);
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <aside className={styles.asideWithToggleSortButton}>
        <button onClick={() => toggleTitleSortOrder()} className={styles.toggleSortOrderButton}> Current Sort: {isAscOrder ? "Asc" : "Desc"}</button>
      </aside>
      <main>
        <section>
          <h1 className={styles.nameOfTableHeader}>{tableName} List</h1>
          <AddTodoForm onAddTodo={addTodo} />
          {isLoading ? (<p>Loading...</p>) : (<TodoList todoList={todoList} onRemoveTodo={removeTodo} />)}
        </section>
        <section>
          <img src={checkListImg} alt="Checklist." className={styles.checkListImg} />             
        </section>
      </main>
    </>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired
};

export default TodoContainer;
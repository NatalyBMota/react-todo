Catch Up Week: No assignment this week

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


- You can remove cached packages by executing 'dnf clean package- The .env.local file should contain the following data:
VITE_AIRTABLE_API_TOKEN=

VITE_AIRTABLE_BASE_ID=

VITE_TABLE_NAME=

- None of the variables in the .env.local file should end with a semicolens.

- An alternate to the following line of code:
  const newTodoTitle = todoInput.value;
- This is it:
  const newTodoTitle = event.target.value;

- The following code is the Vanilla JavaScript way of clearing the form field once the "Add" button has been clicked:
  const todoInput = document.querySelector("input");
  todoInput.value = "";
- That code would go inside of the declaration for the handleAddTodo function, inside of the AddToDoForm.jsx, if we needed to use Vanilla JavaScript. Yet, as Roy Mosby mentioned, "useState provides both a state value and a function to update that state value." So, this code is unecessary and has been replaced with a call to that "function to update that state value." So, now, we are using the following code inside the declaration for the handleAddTodo function, instead:
  setTodoTitle("");

- At the top of the useSemiPersistentState function declaration on App.jsx, I was previously using short-circuit evaluation, through the following line of code:
  let [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);
- I am now using the nullish coalescing operator instead. Both work, but I just learned about the latter, so I decided to use it. The new code looks like this:
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) ?? []);
- In Roy Mosby's comments in my pull request for lesson 1.4, he mentioned that "React needs to be able to track all of the components that it renders and uses key={todo.id} to do so." He also mentioned that "React will be giving" me "a warning about" the "list items;" which are created through the TodoListItem function, in the TodoListItem.jsx file; "not having an id." That is because, my code for that function was previously returning the following line of code:
<li>{todo}</li>
- I believe that I fixed this issue by having the TodoListItem function return the following line of code instead:
<li key={todo.id}>{todo}</li>

- Removing an item from todoList which has a given id; as required to do in lesson 1.6's assignment; could involve using the filter method of the array.
- A good tutorial that explains how to use that particular array method is available at FreeCodeCamp at:
  https://www.freecodecamp.org/news/javascript-filter-method/
- It explains that "the filter method in JavaScript is designed as a higher-order function that iterates over each element of an array, allowing developers to apply a specific condition to filter out elements." It also states that "the filter method doesn't modify the original array, but instead creates and returns a new array containing only the elements that meet the specified condition."
- It gives an example in which, "you have an array of numbers and you want to filter out only the even numbers." Then, it shows you that you can achieve that with the following code:
  const numbers = [1, 2, 3, 4, 5];
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  // evenNumbers: [2, 4]
- It also gives another, even more relevant example, in which "you have an array of objects representing products, and you want to filter out products with prices greater than $50." Then, it provides the code with which you can achieve that. It is as follows:
  const products = [
  { id: 1, name: 'Product 1', price: 40 },
  { id: 2, name: 'Product 2', price: 60 },
  { id: 3, name: 'Product 3', price: 30 }
  ];
  const expensiveProducts = products.filter(product => product.price > 50);
  // expensiveProducts: [{ id: 2, name: 'Product 2', price: 60 }]

  - Priorly, I was using the following line of code at the top of the App component function, in App.jsx:
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) ?? [])

- A clue about how to delete a record from a table in AirTable, using the AirTable API in conjunction with the fetch method, can be found in the AirTable API's documentation here:
  https://airtable.com/app2PWdIhOrGFyQZj/api/docs#curl/table:default:delete

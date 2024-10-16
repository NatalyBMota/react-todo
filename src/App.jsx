import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import TodoContainer from './components/TodoContainer.jsx';
import LandingPage from './components/LandingPage.jsx';
import { Link } from "react-router-dom";
import styles from './styles/App.module.css';
import './styles/App.css';

const App = () => {    
  const tableName = import.meta.env.VITE_TABLE_NAME; 
  return (
    <BrowserRouter>
      <nav>
          <Link to="/" alt="Render a todo list that can be edited." className={styles.navLink}>Todo List</Link>
          <Link to="/landing" alt="Go to the landing page." className={styles.navLink}>Landing Page</Link>
      </nav>
      <Routes>
            <Route path="/" exact element={
                <TodoContainer tableName={tableName} />
            }>
            </Route>
            <Route path="/landing" exact element={
                <LandingPage />
            }>
            </Route> 
      </Routes>
      <footer>
          <Link to="https://icons8.com/icons/set/favicon" target="_blank" title="Where I got my fav (or favorite) icon from." className={styles.footerLink}>Fav Icons</Link>
      </footer>
    </BrowserRouter>
  );
};

export default App;

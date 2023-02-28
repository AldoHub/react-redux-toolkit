import './App.css';
import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/routes";


function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/create">create new</NavLink></li>
        </ul>
      </nav>
      <AppRoutes/>
    </div>
  );
}

export default App;

import TodoList from './Components/TodoList';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";

function App() {

    return (
        <div>
            <Outlet />
            <TodoList />
        </div>
    );
}

export default App;

import TodoList from './Components/TodoList';
import {Outlet} from "react-router-dom";

function App() {

    return (
        <div>
            <Outlet />
            <TodoList />
        </div>
    );
}

export default App;

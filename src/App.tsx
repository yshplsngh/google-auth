import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./Login.tsx";
import Home from "./Home.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

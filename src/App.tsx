import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import OauthError from "./pages/OauthError.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/oauth/error'} element={<OauthError/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

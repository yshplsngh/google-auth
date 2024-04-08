import './App.css'
import {useGoogleLogin} from "@react-oauth/google"

function App() {
    const login = useGoogleLogin({
        onSuccess:(tokenResponse) => console.log(tokenResponse)
    })
    return (
        <button onClick={()=>login()}>
            login
        </button>
    )
}

export default App

import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

const Login = () => {
    const handleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse.code);
            console.log(typeof codeResponse.code);
            const response = await axios.post(
                'http://localhost:3000/auth/login',
                JSON.stringify({code:codeResponse.code}),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response)
        },
        flow: 'auth-code',
    });
    return (
        <div>
            <button onClick={() => handleLogin()}>
                Login
            </button>
        </div>
    )
}
export default Login
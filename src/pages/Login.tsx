import '../App.css'
import getGoogleOAuthURL from "./util.ts";



const Login = () => {

    return (
        <div>
            <div className={'container'}>
                <a href={getGoogleOAuthURL()}>Login with Google</a>
                Please login
            </div>
        </div>
    )
}
export default Login
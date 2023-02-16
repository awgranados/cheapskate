import {useAuth0} from "@auth0/auth0-react";

function LoginButton(){
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return(
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()} class="btn btn-primary float-right"> Log in! </button>
        )
    )
};

export default LoginButton;
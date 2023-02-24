import {useAuth0} from "@auth0/auth0-react";

function LogoutButton(){
    const { logout, isAuthenticated } = useAuth0();

    return(
        isAuthenticated && (
            <button className="dropdown-item" onClick={() => logout()} class="btn btn-block btn-link"> Log out! </button>
        )
    )
};

export default LogoutButton;
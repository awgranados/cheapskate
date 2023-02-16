import {useAuth0} from "@auth0/auth0-react";

function UserProfile(){
    const { user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading){
        return <div>Loading!</div>
    }

    return(
        isAuthenticated && (
            <div class = "row align-items-center">
                <h5 class = "px-2" >{user.name}</h5>
                <img src={user.picture} width={50} height={50} class = "rounded float-right" alt='hi'/>
            </div>
        )
    )
};

export default UserProfile;
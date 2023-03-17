import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './logoutButton';
import { Link } from 'react-router-dom';
import './dropdown.css'; 

function Dropdown() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading!</div>
  }

  return (
    isAuthenticated && (
      <div class = "row">
        <li className="nav-item dropdown">
            <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class = "row align-items-center">
                    <i class="fa fa-caret-down" width={25} height={25}/>
                    <h5 class = "px-2" >{user.name}</h5>
                    <img src={user.picture} width={50} height={50} class = "rounded" alt='hi'/>
                </div>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/listtable">My Lists</Link>
                <div className="dropdown-divider"></div>
                <LogoutButton/>
            </div>
        </li>
      </div>
    )
  )
};

export default Dropdown;
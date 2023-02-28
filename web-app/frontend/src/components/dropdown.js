import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './logoutButton';
import { Link } from 'react-router-dom';

function Dropdown() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading!</div>
  }

  return (
    isAuthenticated && (
      <div className="row">
        <li className="nav-item dropdown">
          <Link to="/listtable" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div className="row align-items-center">
              <i className="fa fa-caret-down" width={25} height={25} />
              <h5 className="px-2">{user.name}</h5>
              <img src={user.picture} width={50} height={50} className="rounded" alt='hi' />
            </div>
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/listtable">My Lists</Link>
            <a className="dropdown-item" href="#">Placeholder 2</a>
            <a className="dropdown-item" href="#">Placeholder 3</a>
            <div className="dropdown-divider"></div>
            <LogoutButton />
          </div>
        </li>
      </div>
    )
  )
};

export default Dropdown;

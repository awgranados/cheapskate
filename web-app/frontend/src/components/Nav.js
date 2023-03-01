import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './loginButton';
import Dropdown from './dropdown';

function Nav() {
  return (
    <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navMainMenu"
          aria-controls="navMainMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navMainMenu" className="navbar-collapse collapse">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <Link to="/" className="nav-item nav-link active">
              Cheapskate
            </Link>
            <Link to="/lists" className="nav-item nav-link">
              Lists
            </Link>
            <Link to="/form" className="nav-item nav-link">
              Form
            </Link>
            <Link to="/listtable" className="nav-item nav-link">
              My Lists
            </Link>
            <Link to="/games" className="nav-item nav-link">
              Games
            </Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <LoginButton />
              </li>
              <Dropdown />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

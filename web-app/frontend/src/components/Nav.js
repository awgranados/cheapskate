import React from 'react'; // ES6 js
import {Link} from 'react-router-dom';
import LoginButton from './loginButton';
import Dropdown from './dropdown';

function Nav() {
      
    return(
        <nav class="fixed-top navbar navbar-expand-lg navbar-dark bg-dark top">
            <div class='container-fluid'>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="navMainMenu" class="navbar-collapse collapse">
                    <div class='navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2'>
                        <Link to='/' className="nav-item nav-link active">Cheapskate</Link>
                        <Link to='/lists' className="nav-item nav-link">Lists</Link>
                        <Link to='/form' className="nav-item nav-link">Form</Link>
                        
                        <ul class ="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <LoginButton/>
                            </li>
                            <Dropdown/>
                        </ul>

                        {/* <Link to='/search' className="nav-item nav-link">Search</Link> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}



export default Nav;
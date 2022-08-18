import React from "react";
import { NavLink } from "react-router-dom";


const Header = () => {


  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          < NavLink exact to="/">
            <div className="logo">
              {/* <img src="" alt="icon" /> */}
              <h3>Groupomania</h3>
        <h5>Bienvenue
        
             </h5>
            </div>
          </NavLink>
     </div>
     </div>
            {/* <Logout /> */}
      
    </nav>
  );
};

export default Header;

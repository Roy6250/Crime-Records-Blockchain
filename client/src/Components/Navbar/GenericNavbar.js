import React, {Component} from 'react';

class GenericNavbar extends Component{
    render() 
    {
        return(
            <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
            <b><a href="/" className="brand-logo">Thadam</a></b>
               <ul className = "right">
                   <li><a href = "/police">Home</a></li>
                   <li><a href = "/">Log out</a></li>
               </ul>
            </div>
        </nav>
        )
    }

}

export default GenericNavbar;
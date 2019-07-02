import React, { Component } from "react";
import {withRouter, NavLink} from 'react-router-dom';

const links = [{
  id:1,
  name: 'Home',
  link: '/student'
},
{
  id:1,
  name: 'Teacher',
  link: '/student/teacher'
},
{
  id:1,
  name: 'Notifications',
  link: 'Student/NotifyStudent/notificationfromTeacher'
}
]

class Navbar extends Component {
  render = () => {
    return (
      <div className="row flex-xl-nowrap">
      <div className="col-12 col-md-12 col-xl-12 padding-zero">
        <nav className="box-shadow">
          <NavLink exact to="/student" activeClassName="" className="home-header-nav-item home-header-logo logo hide" />
          <ul>            
            {links && links.map((link,index) => {
                return (
                    <li key={index} className={this.props.location.pathname === link.link ? 'active' : ''}>
                          <NavLink className="nav-link" activeClassName="" exact to={link.link}>{link.name}</NavLink>
                    </li>
                  )
              })}          
            </ul>
            {/* <div className="home-header-nav-item home-header-nav-item--position"><Avatar userProfile={user} currentUser={currentUser}></Avatar></div> */}
        </nav>
      </div>
    </div>
    );
  };
}
export default withRouter(Navbar)

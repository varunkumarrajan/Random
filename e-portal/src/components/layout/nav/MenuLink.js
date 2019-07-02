import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import AuthGuard from '../../../authguard/AuthGuard';
class MenuLinks extends Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [
        {
          text: 'Dashboard',
          link: '/dashboard',
          icon: 'fa-home'
        },
        {
          text: 'Classes',
          link: '/classes',
          icon: 'fa-cog'
        },
        {
          text: 'Curriculum',
          link: '/curriculum',
          icon: 'fa-info-circle'
        },
        {
          text: 'CreateEvent',
          link: '/createevent',
          icon: 'fa fa-calendar'
        }
        ,
        {
          text: 'Student',
          link: '/Student',
          icon: 'fa-graduation-cap'
        }
      ]
    };
  }
  navigateTo = link => {
    this.props.history.push(link);
  };
  signout = () => {
    AuthGuard.signout(() => {
      this.props.history.push('/login');
    });
  };
  render() {
    let links = this.state.links.map((link, i) => (
      <li
        ref={i + 1}
        onClick={() => {
          this.navigateTo(link.link);
        }}
        key={link.link}
      >
        <i aria-hidden="true" className={`fa ${link.icon}`} />
        {link.text}
      </li>
    ));
    links.push(
      <li ref="logout" key="logout" onClick={this.signout}>
        <i aria-hidden="true" className="fa fa-sign-out" />
        Logout
      </li>
    );

    return (
      <div className={this.props.menuStatus} id="menu">
        <ul>{links}</ul>
      </div>
    );
  }
}
export default withRouter(MenuLinks);

import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthGuard from './authguard/AuthGuard';

import { Spinner } from 'react-bootstrap';

import GLOBAL_VARIABLES from './config/config';
import './App.css';
import CreateEvent from './views/Events/events';
import Home from './views/Home';
import Login from './views/Login';
import Curriculum from './views/Curriculum';
import PasswordReset from './views/PasswordReset';
import ChangePassword from './views/ChangePassword';
import Profile from './views/Profile';
import Carousel from './components/carousel/Carousel';
import Category from './views/Category';
import Teacher from './views/Teacher';
import Video from './views/Video';
import NotificationsDescription from './views/Teacher/Notification/notificationsDescription';

import Student from './views/Student/index';
import StudentNotificationsDescription from './views/Student/Notification/notificationsDescription';

import Notification from './views/Notification';
import BList from './views/Blog/list';
import NotificationDetails from './views/NotificationDetails';
import SearchTeacher from './views/Student/SearchTeacher/SearchTeacher';
import {
  getAllCategory,
  createSubjects,
  createBanner,
  getBannerFromDB
} from './database/dal/firebase/dbInitDal';

import ContactUs from './views/ContactUs';
import AboutUs from './views/AboutUs';
import TeacherDetails from './views/Teacher/teacher-details/teacherDetails';
import Footer from './components/layout/footer/Footer';
import * as actionTypesAuth from './authguard/actions';
import BlogDetails from './views/Blog/BlogDetails';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthGuard.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);
class App extends Component {
  state = {
    auth: true,
    user: {}
  };
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.props.setAuthenticationStatus(true);
    } else {
      this.props.setAuthenticationStatus(false);
    }
    if (!user && this.props.location) {
      GLOBAL_VARIABLES.BASEROUTE = this.props.location.pathname;
      this.props.history.push('/home');
    }
  }

  componentDidMount = () => {
    getAllCategory().then(doc => {
      if (!doc.exists) {
        const subjects = {
          subjects: [
            'English',
            'Maths',
            'Music',
            'Science',
            'IT & Software',
            'Business',
            'Design',
            'Development',
            'Photography',
            'Marketing'
          ]
        };
        createSubjects(subjects);
      }
    });
    getBannerFromDB().then(bannerDoc => {
      if (bannerDoc.empty) {
        const bannerData = [
          { banner_image: 'business-banner-1600x300.jpg', page: 'home' },
          { banner_image: 'student_banner.jpg', page: 'home' },
          { banner_image: 'business-banner-1600x300.jpg', page: 'student' },
          { banner_image: 'student_banner.jpg', page: 'student' },
          { banner_image: 'teacher_banner.jpg', page: 'teacher' }
        ];
        bannerData.map(data => {
          createBanner(data);
        });
      }
    });
  };
  render() {
    return (
      <div>
        {this.props.spinnerStatus && (
          <div className="dark-bg">
            <Spinner
              animation="border"
              className="spinner-center"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="bottom-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/home/teacher/:id" component={teacherDetails} />  */}
          <Route
            exact
            path="/home/teacher/:id"
            render={props => <TeacherDetails {...props} />}
          />
          {/* <Route exact path="/blog" component={BlogDetails} /> */}
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/resetPassword" component={PasswordReset} />
          <Route exact path="/student/teacher" component={SearchTeacher} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/curriculum" component={Curriculum} />
          <PrivateRoute path="/student" component={Student} exact />
          <PrivateRoute path="/changePassword" component={ChangePassword} />
          <PrivateRoute path="/createevent" component={CreateEvent} />
          <PrivateRoute path="/carousel" component={Carousel} exact />
          <PrivateRoute path="/category" component={Category} exact />
          <PrivateRoute path="/teacher" component={Teacher} exact />
          <PrivateRoute path="/videos" component={Video} exact />
          <PrivateRoute path="/notification" component={Notification} exact />
          <PrivateRoute
            path="/notificationdetails/:id"
            component={NotificationDetails}
            exact
          />
          <PrivateRoute
            path="/teacher/notificationsDescription/:nid"
            component={NotificationsDescription}
          />
          <PrivateRoute
            path="/student/notificationsDescription/:sid"
            component={StudentNotificationsDescription}
          />

          <PrivateRoute path="/blog/list" component={BList} />
          <Route path="/blog/view/:id" component={BlogDetails} />
          {/* <Route path="/teacher/notificationsDetails" component={NotificationsDetails} />
          <Route path="/student/notificationsDetails" component={StudentNotificationsDetails} />
          

         
          {/* <PrivateRoute
            path="/teacher/notifications"
            component={Notification}
            exact
          /> */}

          {/* <PrivateRoute
            path="/student/notificationfromTeacher"
            component={NotificationfromTeacher}
            exact
          />
             <PrivateRoute
            path="/student/notificationFullDetails"
            component={NotificationFullDetails}
            exact
          /> */}

          <PrivateRoute
            path="/student/teacher"
            component={SearchTeacher}
            exact
          />
          {/* <PrivateRoute
            path="/teacher/teacherNotificationFulldetails"
            component={TeacherNotificationFulldetails}
            exact
          /> */}
          <Redirect to="/home" />
        </Switch>
        {this.props.authenticationStatus && <Footer />}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
App.defaultProps = {
  children: null
};
const mapStateToProps = state => {
  // const loginResponse = JSON.parse(localStorage.getItem('user'));
  // console.log('app state', state)
  return {
    authenticationStatus: state.authStatus.authenticationStatus,
    spinnerStatus: state.spinnerStatus.spinnerStatus,
    modalState: state.openModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch({ type: 'open' }),
    setAuthenticationStatus: value => {
      dispatch({ type: actionTypesAuth.AUTHENTICATION_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

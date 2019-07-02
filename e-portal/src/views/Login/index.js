import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { toastr } from 'react-redux-toastr';

import {
  fetchProviders,
  createUserWithEmail,
  getProfileStatus,
  signInUserWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  loginWithTwitter,
  saveRecord,
  getUserProfile,
  createRatingRecord
} from '../../database/dal/firebase/registrationDal';
import GLOBAL_VARIABLES from '../../config/config';
import * as actionTypes from '../../spinnerStore/actions';
import * as actionTypesAuth from '../../authguard/actions';
import AuthGuard from '../../authguard/AuthGuard';

let userIcon = {
  width: '20px',
  height: '20px',
  position: 'absolute',
  right: '12px',
  top: '12px',
  zIndex: '10',
  backgroundImage: "url('../../Assets/hdpi/login_disable.png')",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};
let passwordIcon = {
  width: '20px',
  height: '15px',
  position: 'absolute',
  right: '10px',
  top: '15px',
  zIndex: '10',
  backgroundImage: "url('../../Assets/hdpi/password_disable.png')",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Login extends Component {
  state = {
    username: '',
    password: '',
    submitted: false,
    loggedInStatus: false,
    errorMessage: ''
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user) {
      if (user.role === 'Teacher') {
        this.props.history.push('/teacher');
      } else {
        this.props.history.push('/student');
      }
    }
  };

  userIconStyle() {
    document.getElementById('userIcon').style.backgroundImage =
      "url('../../Assets/hdpi/login_oragnge.png')";
  }
  userIconDisableStyle() {
    document.getElementById('userIcon').style.backgroundImage =
      "url('../../Assets/hdpi/login_disable.png')";
  }

  passwordIconStyle() {
    document.getElementById('passwordIcon').style.backgroundImage =
      "url('../../Assets/hdpi/password_orange.png')";
  }
  passwordIconDisableStyle() {
    document.getElementById('passwordIcon').style.backgroundImage =
      "url('../../Assets/hdpi/password_disable.png')";
  }
  togglePassword = () => {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
    x.focus();
    this.passwordIconStyle();
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  redirectBasedOnProfileStatus(userDetails) {
    getProfileStatus(userDetails.user.uid)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const user = doc.data();
          if (user.profileSaved === true) {
            getUserProfile(userDetails.user.uid).then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const user = doc.data();
                localStorage.setItem('userProfile', JSON.stringify(user));
                if (doc.exists) {
                  if (user.role === 'Teacher') {
                    const teacherDetailId = localStorage.getItem(
                      'teacherDetailId'
                    );

                    if (teacherDetailId) {
                      console.log('logic');
                      this.props.history.push(
                        `/home/teacher/${teacherDetailId}`
                      );
                      localStorage.removeItem('teacherDetailsId');
                    } else {
                      console.log('else');
                      this.props.history.push('/teacher');
                    }
                  } else {
                    this.props.history.push('/student');
                  }
                }
              });
            });
          } else {
            this.props.history.push('/profile');
          }
        });
      })
      .catch(error => {
        this.props.setSpinnerStatus(false);
        console.log('error.message', error.message);
      });
  }

  createUserRatingRecord = userId => {
    const ratingRecord = { rating: 0, ratings: [] };
    createRatingRecord(ratingRecord, userId);
  };

  setLoginStatus(userDetails, isNewUser) {
    this.props.setSpinnerStatus(false);
    AuthGuard.authenticate(() => {
      this.props.setAuthenticationStatus(true);
      if (GLOBAL_VARIABLES.BASEROUTE !== '/home') {
        this.props.history.push(GLOBAL_VARIABLES.BASEROUTE);
      } else {
        if (isNewUser) {
          this.props.history.push('/profile');
        } else {
          this.redirectBasedOnProfileStatus(userDetails);
        }
      }
    });
  }

  login = e => {
    e.preventDefault();
    this.props.setSpinnerStatus(true);
    const { username, password } = this.state;
    this.setState({ submitted: true });
    const userDetails = { username, password };
    if (username !== '' && password !== '') {
      fetchProviders(userDetails).then(providers => {
        console.log(providers);
        if (providers.length === 0) {
          // create user
          createUserWithEmail(userDetails).then(
            loginResponse => {
              localStorage.setItem('user', JSON.stringify(loginResponse));
              if (loginResponse && loginResponse.additionalUserInfo.isNewUser) {
                saveRecord({
                  username: username,
                  userId: loginResponse.user.uid,
                  profileSaved: false
                });
                this.createUserRatingRecord(loginResponse.user.uid);
              }
              this.setLoginStatus(loginResponse, true);
            },
            error => {
              this.props.setSpinnerStatus(false);
              toastr.error(error.message);
            }
          );
        } else if (providers[0] !== 'password') {
          toastr.error(
            'This Account is linked with ' +
              providers[0] +
              '. Sign in using this method'
          );
          this.props.setSpinnerStatus(false);
        } else {
          signInUserWithEmail(userDetails).then(
            loginResponse => {
              localStorage.setItem('user', JSON.stringify(loginResponse));
              this.setLoginStatus(loginResponse, false);
            },
            error => {
              this.props.setSpinnerStatus(false);
              toastr.error(error.message);
            }
          );
        }
      });
    }
  };

  loginWithGoogle = e => {
    e.preventDefault();
    this.props.setSpinnerStatus(true);
    loginWithGoogle()
      .then(loginResponse => {
        localStorage.setItem('user', JSON.stringify(loginResponse));
        if (loginResponse && loginResponse.additionalUserInfo.isNewUser) {
          saveRecord({
            username: loginResponse.additionalUserInfo.profile.email,
            userId: loginResponse.user.uid,
            profileSaved: false
          }).then(() => {
            this.setLoginStatus(loginResponse, true);
          });
          this.createUserRatingRecord(loginResponse.user.uid);
        } else {
          this.setLoginStatus(loginResponse, false);
        }
      })
      .catch(error => {
        this.props.setSpinnerStatus(false);
        toastr.error(error.message);
      });
  };

  loginWithFacebook = e => {
    e.preventDefault();
    this.props.setSpinnerStatus(true);
    loginWithFacebook()
      .then(loginResponse => {
        localStorage.setItem('user', JSON.stringify(loginResponse));
        if (loginResponse && loginResponse.additionalUserInfo.isNewUser) {
          saveRecord({
            username: loginResponse.additionalUserInfo.profile.email,
            userId: loginResponse.user.uid,
            profileSaved: false
          }).then(() => {
            this.setLoginStatus(loginResponse, true);
          });
          this.createUserRatingRecord(loginResponse.user.uid);
        } else {
          this.setLoginStatus(loginResponse, false);
        }
      })
      .catch(error => {
        this.props.setSpinnerStatus(false);
        toastr.error(error.message);
      });
  };

  loginWithTwitter = e => {
    e.preventDefault();
    this.props.setSpinnerStatus(true);
    loginWithTwitter()
      .then(loginResponse => {
        localStorage.setItem('user', JSON.stringify(loginResponse));
        if (loginResponse && loginResponse.additionalUserInfo.isNewUser) {
          saveRecord({
            username: loginResponse.additionalUserInfo.username,
            userId: loginResponse.user.uid,
            profileSaved: false
          }).then(() => {
            this.setLoginStatus(loginResponse, true);
          });
          this.createUserRatingRecord(loginResponse.user.uid);
        } else {
          this.setLoginStatus(loginResponse, false);
        }
      })
      .catch(error => {
        this.props.setSpinnerStatus(false);
        toastr.error(error.message);
      });
  };

  handlePasswordReset = () => {
    this.props.history.push('/resetPassword');
  };

  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } };

    const { username, password, submitted } = this.state;
    return (
      <div>
        <div className="row row-without--margin">
          <div className="col-12 col-sm-8 col-md-8 col-lg-4 content-container content-align--middle">
            <div className="card card-border-radius">
              <div>
                <div className="col-12 sign-in--text">
                  <span className="sign-in-text--padding">Sign In/Sign Up</span>
                </div>

                <form name="form" className="login-form--padding">
                  <div className="alert alert-info" role="alert">
                    Note: If you do not have an account, one will be created for
                    you!
                  </div>
                  <span className="help-block">
                    {this.state.errorMessage ? this.state.errorMessage : ''}
                  </span>
                  <div
                    className={
                      'form-group' + (submitted && !username ? 'has-error' : '')
                    }
                  >
                    <label className="label-color" htmlFor="username">
                      Username
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control input-field--style form-input-icon--padding"
                        name="username"
                        value={username}
                        onFocus={this.userIconStyle}
                        onBlur={this.userIconDisableStyle}
                        onChange={this.handleChange}
                      />
                      <span
                        id="userIcon"
                        className="input-group-addon"
                        style={userIcon}
                      />
                    </div>
                    {submitted && !username && (
                      <div className="help-block">Username is required</div>
                    )}
                  </div>
                  <div
                    className={
                      'form-group' +
                      (submitted && !password ? ' has-error' : '')
                    }
                  >
                    <label className="label-color" htmlFor="password">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        id="password"
                        type="password"
                        className="form-control input-field--style"
                        name="password"
                        value={password}
                        onFocus={this.passwordIconStyle}
                        onBlur={this.passwordIconDisableStyle}
                        onChange={this.handleChange}
                      />
                      <span
                        id="passwordIcon"
                        className="input-group-addon"
                        style={passwordIcon}
                        onClick={this.togglePassword}
                      />
                    </div>

                    {submitted && !password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </div>
                  <div>
                    <label
                      className="label-color"
                      style={{ cursor: 'pointer' }}
                      onClick={this.handlePasswordReset}
                    >
                      <u>FORGOT PASSWORD</u>
                    </label>
                    {/* <a onClick={this.props.openPDFModal}> open pdf</a>

                <PDFViewer /> */}
                  </div>
                  <div className="form-group padding-top-15">
                    <button
                      onClick={e => this.login(e)}
                      type="button"
                      className="btn btn-success btn-block"
                    >
                      LOGIN
                    </button>
                  </div>
                  <div className="form-group social-login--align">
                    <button
                      className="btn social-login--size"
                      style={{
                        backgroundPosition: 'center center',
                        backgroundImage:
                          "url('../../Assets/hdpi/google_logo.ico')",
                        backgroundRepeat: 'no-repeat'
                      }}
                      onClick={e => this.loginWithGoogle(e)}
                    />
                    {/* <button
                      className="btn social-login--size"
                      style={{
                        backgroundPosition: 'center center',
                        backgroundImage: "url('../../Assets/hdpi/fb_logo.ico')",
                        backgroundRepeat: 'no-repeat'
                      }}
                      onClick={e => this.loginWithFacebook(e)}
                    /> */}
                    <button
                      className="btn social-login--size"
                      style={{
                        backgroundPosition: 'center center',
                        backgroundImage:
                          "url('../../Assets/hdpi/twitter_logo.ico')",
                        backgroundRepeat: 'no-repeat'
                      }}
                      onClick={e => this.loginWithTwitter(e)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('global state', state);
  return {
    loggedInStatus: state.login.loggedInStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    },
    setAuthenticationStatus: value => {
      dispatch({ type: actionTypesAuth.AUTHENTICATION_STATUS, payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

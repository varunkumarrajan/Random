import React, { Component } from 'react';
import { /* Link, */ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginAction from './actions';

import './styles.css';
// import AuthGuard from '../../authguard/AuthGuard';
import { toastr } from 'react-redux-toastr';
import * as actionTypes from '../../spinnerStore/actions';
import { recoverPassword } from '../../database/dal/firebase/registrationDal';

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

class PasswordReset extends Component {
  state = {
    username: '',
    submitted: false,
    loggedInStatus: false,
    errorMessage: '',
    redirectToReferrer: false
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

  resetPassword = () => {
    this.props.setSpinnerStatus(true);
    this.setState({ submitted: true });
    recoverPassword(this.state.username)
      .then(() => {
        this.props.setSpinnerStatus(false);
        toastr.success('Password Reset Link Sent Successfully');
        this.props.history.push('/login');
      })
      .catch(error => {
        this.props.setSpinnerStatus(false);
        this.setState({ username: '' });
        toastr.error('User Not Found. Please Enter Registered Email ID');
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    const { username, submitted } = this.state;
    return (
      <div>
        <div className="row row-without--margin">
          <div className="col-12 col-sm-8 col-md-8 col-lg-4 content-container content-align--middle">
            <div className="card card-border-radius">
              <div>
                <div className="col-12 sign-in--text">
                  <span className="sign-in-text--padding">Reset Password</span>
                </div>

                <form name="form" className="login-form--padding">
                  <span className="help-block">
                    {this.state.errorMessage ? this.state.errorMessage : ''}
                  </span>
                  <div
                    className={
                      'form-group' +
                      (submitted && !username ? ' has-error' : '')
                    }
                  >
                    <label className="label-color" htmlFor="username">
                      Enter Registered Email ID
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
                      <div className="help-block">Email ID is required</div>
                    )}
                  </div>

                  <div className="form-group padding-top-25">
                    <button
                      onClick={this.resetPassword}
                      type="button"
                      className="btn btn-success btn-block"
                    >
                      RESET PASSWORD
                    </button>
                  </div>
                  <div className="form-group padding-top-25">
                    <button
                      onClick={() => this.props.history.push('/login')}
                      type="button"
                      className="btn btn-warning btn-block"
                    >
                      CANCEL
                    </button>
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
    setSpinnerStatus: val => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: val });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordReset);

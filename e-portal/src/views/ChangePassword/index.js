import React, { Component } from 'react';
import { /* Link, */ Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginAction from './actions';

import './styles.css';
import AuthGuard from '../../authguard/AuthGuard';
import HeaderHome from '../../components/layout/header/HeaderHome';
import { toastr } from 'react-redux-toastr';
import * as actionTypes from '../../spinnerStore/actions';
import { changePassword } from '../../database/dal/firebase/changePasswordDal';

let passwordIcon = {
  width: '20px',
  height: '15px',
  position: 'absolute',
  right: '10px',
  top: '15px',
  zIndex: '10',
  backgroundImage: "url('../../Assets/hdpi/password_orange.png')",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    submitted: false,
    loggedInStatus: false,
    errorMessage: '',
    redirectToReferrer: false
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const provider = JSON.parse(localStorage.getItem('user')).additionalUserInfo
      .providerId;
    if (user) {
      if (provider !== 'password') {
        if (user.role === 'Teacher') {
          this.props.history.push('/teacher');
        } else {
          this.props.history.push('/student');
        }
      }
    }
  };

  togglePassword = field => {
    var x = document.getElementById(field);
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
    x.focus();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updatePassword = () => {
    this.props.setSpinnerStatus(true);
    this.setState({ submitted: true });
    const { password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      changePassword(this.state.password)
        .then(() => {
          this.props.setSpinnerStatus(false);
          toastr.success('Password Updated Successfully');
          const user = JSON.parse(localStorage.getItem('userProfile'));
          if (user) {
            if (user.role === 'Teacher') {
              this.props.history.push('/teacher');
            } else {
              this.props.history.push('/student');
            }
          }
        })
        .catch(error => {
          this.props.setSpinnerStatus(false);
          toastr.error(`${error.message} Login Again`);
          AuthGuard.signout();
          this.props.history.push('/login');
        });
    } else {
      this.props.setSpinnerStatus(false);
      this.setState({ errorMessage: 'Passwords do not match' });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    const { password, confirmPassword, submitted } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome headeTitle="" />
          </div>
        </div>
        <div className="content-container row-without--margin">
          <div className="col-12 col-sm-8 col-md-8 col-lg-4 content-container content-align--middle">
            <div
              className="card card-border-radius"
              style={{ background: '#4b4e68' }}
            >
              <div>
                <div
                  className="col-12 sign-in--text"
                  style={{ marginTop: '5px' }}
                >
                  <span className="sign-in-text--color">Change Password</span>
                </div>

                <form name="form" className="login-form--padding">
                  <span className="help-block">
                    {this.state.errorMessage ? this.state.errorMessage : ''}
                  </span>
                  <div
                    className={
                      'form-group' +
                      (submitted && !password ? ' has-error' : '')
                    }
                  >
                    <label className="label-color" htmlFor="password">
                      Enter New Password
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        id="password"
                        className="form-control input-field--style form-input-icon--padding"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                      <span
                        id="passwordIcon"
                        className="input-group-addon"
                        style={passwordIcon}
                        onClick={() => this.togglePassword('password')}
                      />
                    </div>
                    {submitted && !password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </div>
                  <div
                    className={
                      'form-group' +
                      (submitted && !confirmPassword ? ' has-error' : '')
                    }
                  >
                    <label className="label-color" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control input-field--style form-input-icon--padding"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                      />
                      <span
                        id="passwordIcon"
                        className="input-group-addon"
                        style={passwordIcon}
                        onClick={() => this.togglePassword('confirmPassword')}
                      />
                    </div>
                    {submitted && !confirmPassword && (
                      <div className="help-block">
                        Confirm Password is required
                      </div>
                    )}
                  </div>

                  <div className="form-group padding-top-25">
                    <button
                      onClick={this.updatePassword}
                      type="button"
                      className="btn btn-success btn-block"
                    >
                      UPDATE PASSWORD
                    </button>
                  </div>
                  <div className="form-group padding-top-25">
                    <button
                      onClick={() => {
                        this.props.history.push('/home');
                      }}
                      type="button"
                      className="btn btn-dark btn-block"
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
)(ChangePassword);

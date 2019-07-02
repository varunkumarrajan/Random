import React, { Component } from 'react';
import HeaderHome from '../../components/layout/header/HeaderHome';

import './styles.css';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionTypes from '../../spinnerStore/actions';
import {
  saveUserProfile,
  getUserProfile,
  uploadUserProfilePic,
  getProfileDownloadUrl,
  getUserRating,
  createRatingRecord
} from '../../database/dal/firebase/registrationDal';
import { getAllCategory } from '../../database/dal/firebase/categoryDal';
import SelectSearch from '../../components/select-search';

let subjects = [];
class Profile extends Component {
  state = {
    gender: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    city: '',
    country: '',
    mobile: '',
    email: '',
    role: '',
    subject: '',
    charge: '',
    currency: '',
    summary: '',
    isUploading: false,
    isFutureDate: false,
    profileImage:
      'https://firebasestorage.googleapis.com/v0/b/e-project-4e023.appspot.com/o/profilepic%2FuserProfile.png?alt=media&token=cfb3e9a8-8508-4acd-8e45-dd97e2ea3dec',
    submitted: false,
    errorMessage: '',
    rating: 0,
    noOfRatings: 0,
    countryList: [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Åland Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'AndorrA', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: "Cote D'Ivoire", code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: "Korea, Democratic People'S Republic of", code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: "Lao People'S Democratic Republic", code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'RWANDA', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia and Montenegro', code: 'CS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Viet Nam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' }
    ],
    selectSubject: [],
    genderCollection: [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' },
      { name: 'Other', code: 'Other' }
    ],
    roleCollection: [
      { name: 'Teacher', code: 'Teacher' },
      { name: 'Student', code: 'Student' }
    ],
    currencyCollection: [
      { name: 'US Dollar', code: 'US Dollar' },
      { name: 'Pound', code: 'Pound' },
      { name: 'Rupee', code: 'Rupee' },
      { name: 'Euro', code: 'Euro' }
    ]
  };

  constructor(props) {
    super(props);
    this.props.setSpinnerStatus(true);
  }

  handleDropdownSelection = (option, property) => {
    this.setState({ [property]: option });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateDob = e => {
    const { name, value } = e.target;
    const now = moment().format('YYYY-MM-DD');
    if (value > now) {
      this.setState({ isFutureDate: true });
    } else {
      this.setState({ [name]: value, isFutureDate: false });
    }
  };
  componentDidMount = () => {
    const userId = JSON.parse(localStorage.getItem('user')).user.uid;

    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        subjects = [...doc.data().subjects];
      });
      const subjectList = subjects.map(data => {
        return { name: data, code: data };
      });
      this.setState({ selectSubject: subjectList });
    });

    getUserRating(userId).then(doc => {
      if (!doc.exists) {
        const ratingRecord = { rating: 0, ratings: [] };
        createRatingRecord(ratingRecord, userId);
      }
    });

    getUserProfile(userId).then(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const user = doc.data();
          if (doc.exists) {
            this.setState({
              firstName: user.firstName,
              lastName: user.lastName,
              dob: user.dob,
              gender: user.gender,
              address: user.address,
              city: user.city,
              country: user.country,
              email: user.email,
              mobile: user.mobile,
              role: user.role,
              profileImage: user.profileImage,
              subject: user.subject
            });
            if (user.role === 'Teacher') {
              this.setState({
                charge: user.charge,
                currency: user.currency,
                summary: user.summary
              });
            }
            if (user.rating) {
              this.setState({
                rating: user.rating
              });
            }
            if (user.noOfRatings) {
              this.setState({
                noOfRatings: user.noOfRatings
              });
            }
          }
        });
        this.props.setSpinnerStatus(false);
      },
      error => {
        this.props.setSpinnerStatus(false);
        toastr.error(error.message);
      }
    );
  };

  uploadProfilePic = e => {
    const fileDetails = e.target.files[0];
    const userId = JSON.parse(localStorage.getItem('user')).user.uid;
    if (fileDetails.type.indexOf('image') > -1) {
      this.setState({ isUploading: true, errorMessage: '' });
      uploadUserProfilePic(fileDetails, userId)
        .then(() => {
          getProfileDownloadUrl(fileDetails, userId).then(url => {
            this.setState({ isUploading: false, profileImage: url });
          });
        })
        .catch(error => {
          this.setState({ isUploading: false });
          toastr.error(error.code);
          console.log(error);
        });
    } else {
      this.setState({ errorMessage: 'Only Images Accepted' });
    }
  };

  saveDetails = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      dob,
      gender,
      address,
      city,
      country,
      email,
      mobile,
      role,
      subject,
      charge,
      currency,
      profileImage,
      summary
    } = this.state;

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const userId = userDetails.user.uid;
    this.setState({ submitted: true });

    if (role === 'Teacher') {
      const teacherDetails = {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        country,
        email,
        mobile,
        role,
        subject,
        charge,
        currency,
        profileImage,
        summary,
        userId
      };

      if (
        firstName !== '' &&
        lastName !== '' &&
        dob !== '' &&
        gender !== '' &&
        address !== '' &&
        city !== '' &&
        country !== '' &&
        email !== '' &&
        mobile !== '' &&
        role !== '' &&
        subject !== '' &&
        charge !== '' &&
        currency !== ''
      ) {
        teacherDetails.createdAt = new Date(Number(userDetails.user.createdAt));
        if (this.state.rating === 0) {
          teacherDetails.rating = 0;
        } else {
          teacherDetails.rating = this.state.rating;
        }
        if (this.state.noOfRatings === 0) {
          teacherDetails.noOfRatings = 0;
        } else {
          teacherDetails.noOfRatings = this.state.noOfRatings;
        }
        saveUserProfile(teacherDetails).then(() => {
          localStorage.setItem('userProfile', JSON.stringify(teacherDetails));
          toastr.success('Details Saved Successfully');
          this.props.history.push('/teacher');
        });
      }
    } else {
      const studentDetails = {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        country,
        email,
        mobile,
        role,
        subject,
        profileImage,
        userId
      };

      if (
        firstName !== '' &&
        lastName !== '' &&
        dob !== '' &&
        gender !== '' &&
        address !== '' &&
        city !== '' &&
        country !== '' &&
        email !== '' &&
        mobile !== '' &&
        role !== '' &&
        subject !== ''
      ) {
        studentDetails.createdAt = new Date(userDetails.user.createdAt);

        if (this.state.rating === 0) {
          studentDetails.rating = 0;
        } else {
          studentDetails.rating = this.state.rating;
        }
        if (this.state.noOfRatings === 0) {
          studentDetails.noOfRatings = 0;
        } else {
          studentDetails.noOfRatings = this.state.noOfRatings;
        }
        saveUserProfile(studentDetails).then(() => {
          localStorage.setItem('userProfile', JSON.stringify(studentDetails));
          toastr.success('Details Saved Successfully');
          this.props.history.push('/student');
        });
      }
    }
  };

  render() {
    const {
      firstName,
      lastName,
      dob,
      gender,
      address,
      city,
      country,
      email,
      mobile,
      role,
      subject,
      charge,
      currency,
      summary,
      profileImage,
      isUploading,
      submitted,
      selectSubject,
      genderCollection,
      roleCollection,
      currencyCollection,
      isFutureDate
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <HeaderHome headeTitle="User Profile" />
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 center-form">
          <div className="panel panel-default">
            <div className="card col-lg-11 col-xl-11 panel-body profile-container--style">
              <form>
                <div className="panel-heading">
                  <h3 className="panel-title">Personal Details</h3>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <div className="profile-image-placeholder">
                        <img
                          src={profileImage}
                          className="img-thumbnail thumbnail-style"
                          alt="User Profile"
                          width="240"
                          height="200"
                        />
                        {isUploading && (
                          <div className="text-block ">
                            <span className="blink-text">Uploading...</span>
                          </div>
                        )}
                      </div>

                      <div className="custom-file file-margin">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="profileImage"
                          accept="image/*"
                          onChange={e => this.uploadProfilePic(e)}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="profileImage"
                        >
                          Choose a profile pic...
                        </label>
                        <span className="help-block">
                          {this.state.errorMessage
                            ? this.state.errorMessage
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="first_name">
                      First Name*
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !firstName && (
                        <div className="help-block">FirstName is required</div>
                      )}
                    </div>
                    <label className="label-color" htmlFor="first_name">
                      Last Name*
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !lastName && (
                        <div className="help-block">LastName is required</div>
                      )}
                    </div>
                    <label className="label-color" htmlFor="gender">
                      Gender*
                    </label>

                    <SelectSearch
                      name="gender"
                      properties={{
                        options: genderCollection,
                        selectedValue: gender,
                        optionDisplayNameKey: 'name',
                        optionValueKey: 'name'
                      }}
                      onOptionSelect={e =>
                        this.handleDropdownSelection(e, 'gender')
                      }
                    />
                    {submitted && !gender && (
                      <div className="help-block">Gender is required</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="DOB">
                      DOB*
                    </label>
                    <div className="form-group">
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={dob}
                        onChange={this.validateDob}
                        max={moment().format('YYYY-MM-DD')}
                        className="form-control input-sm"
                      />
                      {submitted && !dob && (
                        <div className="help-block">DOB is required</div>
                      )}
                      {isFutureDate && (
                        <div className="help-block">
                          Please Select a Past Date.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <label className="label-color" htmlFor="email">
                        Secondary Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !email && (
                        <div className="help-block">Email is required</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label-color" htmlFor="address">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={this.handleChange}
                    className="form-control input-sm"
                  />
                  {submitted && !address && (
                    <div className="help-block">Address is required</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="city">
                      City*
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !city && (
                        <div className="help-block">City is required</div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label className="label-color" htmlFor="country">
                      Country*
                    </label>

                    <SelectSearch
                      name="country"
                      properties={{
                        options: this.state.countryList,
                        selectedValue: this.state.country,
                        optionDisplayNameKey: 'name',
                        optionValueKey: 'name'
                      }}
                      onOptionSelect={e =>
                        this.handleDropdownSelection(e, 'country')
                      }
                    />

                    {submitted && !country && (
                      <div className="help-block">Country is required</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <label className="label-color" htmlFor="mobile">
                      Mobile No.*
                    </label>
                    <div className="form-group">
                      <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        value={mobile}
                        onChange={this.handleChange}
                        className="form-control input-sm"
                      />
                      {submitted && !mobile && (
                        <div className="help-block">Mobile No. is required</div>
                      )}
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6" />
                </div>

                <div className="panel-heading">
                  <h3 className="panel-title">Expertise Details</h3>
                </div>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <label className="label-color" htmlFor="role">
                      Role*
                    </label>
                    <SelectSearch
                      name="role"
                      properties={{
                        options: roleCollection,
                        selectedValue: role,
                        optionDisplayNameKey: 'name',
                        optionValueKey: 'name'
                      }}
                      onOptionSelect={e =>
                        this.handleDropdownSelection(e, 'role')
                      }
                    />
                    {submitted && !role && (
                      <div className="help-block">Role is required</div>
                    )}
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6" />
                </div>
                {role === 'Teacher' && (
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="subject">
                        Subject*
                      </label>

                      <SelectSearch
                        name="subject"
                        properties={{
                          options: selectSubject,
                          selectedValue: subject,
                          optionDisplayNameKey: 'name',
                          optionValueKey: 'name'
                        }}
                        onOptionSelect={e =>
                          this.handleDropdownSelection(e, 'subject')
                        }
                      />
                      {submitted && !subject && (
                        <div className="help-block">Subject is required</div>
                      )}
                    </div>
                  </div>
                )}
                {role === 'Teacher' && (
                  <div className="form-group">
                    <label className="label-color" htmlFor="summary">
                      Summary (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="summary"
                      value={summary}
                      onChange={this.handleChange}
                      id="summary"
                    />
                  </div>
                )}
                {role === 'Teacher' && (
                  <div className="panel-heading">
                    <h3 className="panel-title">Pricing Details</h3>
                  </div>
                )}
                {role === 'Teacher' && (
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="charge">
                        Charge (per hour)*
                      </label>
                      <div className="form-group">
                        <input
                          type="number"
                          name="charge"
                          id="charge"
                          value={charge}
                          onChange={this.handleChange}
                          className="form-control input-sm"
                        />
                        {submitted && !charge && (
                          <div className="help-block">Charge is required</div>
                        )}
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="currency">
                        Currency*
                      </label>

                      <SelectSearch
                        name="currency"
                        properties={{
                          options: currencyCollection,
                          selectedValue: currency,
                          optionDisplayNameKey: 'name',
                          optionValueKey: 'name'
                        }}
                        onOptionSelect={e =>
                          this.handleDropdownSelection(e, 'currency')
                        }
                      />
                      {submitted && !currency && (
                        <div className="help-block">Currency is required</div>
                      )}
                    </div>
                  </div>
                )}

                {role === 'Student' && (
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <label className="label-color" htmlFor="role">
                        Subject Interested In
                      </label>
                      <SelectSearch
                        name="subject"
                        properties={{
                          options: selectSubject,
                          selectedValue: subject,
                          optionDisplayNameKey: 'name',
                          optionValueKey: 'name'
                        }}
                        onOptionSelect={e =>
                          this.handleDropdownSelection(e, 'subject')
                        }
                      />
                      {submitted && !subject && (
                        <div className="help-block">Subject is required</div>
                      )}
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" />
                  </div>
                )}

                <div className="row padding-top-15">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <button
                      type="button"
                      onClick={() => {
                        this.props.history.push('/home');
                      }}
                      // onClick={() => saveFeedback()}
                      className="btn btn-dark btn-block"
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <button
                      type="button"
                      onClick={e => this.saveDetails(e)}
                      // onClick={() => saveFeedback()}
                      className="btn btn-dark btn-block"
                    >
                      SAVE DETAILS
                    </button>
                  </div>
                </div>
                <div className="form-group padding-top-15" />
                <div className="col-12">&nbsp;</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // loggedInStatus: state.login.loggedInStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

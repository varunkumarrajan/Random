import React, { Component } from "react";
//import GLOBAL_VARIABLES from '../../config/config';
import HeaderHome from '../../../components/layout/header/HeaderHome';
import Navbar from './../../../shared/components/Navbar';
import { getTeachersBasedOnCateogy, zipRequestDispatch } from './searchTeacherAction';
// import Navigation from '../Navigation/Navigation';
import { connect } from "react-redux";
// import Select from 'react-select';
import { getAllCategory } from "../../../database/dal/firebase/categoryDal";

import Multiselect from "multiselect-dropdown-react";
import "./SearchTeacher.css";
import ListContainer from '../../../components/listContainer/ListContainer';
// import { zipRequestDispatch } from '../../../shared/library/ZipcodesByRadius';

class SearchTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      searchParameter: [],
      placeHolderValue: "",
      searchValue: "",
      filtredTeacherRecord: [],
      showValidationMessage: "",
      noRecordMessage: "Search for your teacher here",
      categoryList: [],
      selectedSubject: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSerachParameter = this.getSerachParameter.bind(this);
    this.setfilteredTeacher = this.setfilteredTeacher.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    // const zipcode = this.state.searchValue;
    this.props.getTeachersBasedOnZipcode('99501');

    getAllCategory().onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const subjects = [...doc.data().subjects];
        this.setState({ categoryList: subjects });
        if (self.props.selectedSubjectFromHome) {
          self.props.getTeachersBasedOnCateogy(
            self.props.selectedSubjectFromHome
          );
          this.setState({
            selectedSubject: self.props.selectedSubjectFromHome
          });
        } else {
          this.props.getTeachersBasedOnCateogy(subjects["0"]);
        }
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getSerachParameter(nextProps, "defalutSubjectSelected");
  }

  handleChange = selectedOption => {
    this.setState({
      searchParameter: selectedOption
    });
  };

  setSaerchValue = event => {
    this.setState({
      searchValue: event.target.value
    });
  };




  getSerachParameter = (searchParameter, defalutSubjectSelected) => {
    // console.log('searchParameter', searchParameter);
    if (defalutSubjectSelected !== "defalutSubjectSelected") {
      const lowerCase = this.state.searchValue.toLowerCase();
      const tempArray = [];
      this.props.TeacherList.forEach(teacher => {
        this.state.searchParameter.forEach(searchParameter => {
          if (
            searchParameter === "Name" &&
            teacher.subject === this.state.selectedSubject
          ) {
            const teacherFirsnameLower = teacher.firstName.toLowerCase();
            const teacherLastNameLower = teacher.lastName.toLowerCase();
            if (
              teacherFirsnameLower.indexOf(lowerCase) !== -1 ||
              teacherLastNameLower.indexOf(lowerCase) !== -1
            ) {
              tempArray.push(teacher);
            }
          }

          if (
            searchParameter === "Location" &&
            teacher.subject === this.state.selectedSubject
          ) {
            const teacherCityName = teacher.city.toLowerCase();
            const teacheraddress = teacher.address.toLowerCase();
            const teachercountry = teacher.country.toLowerCase();
            if (
              teacherCityName.indexOf(lowerCase) !== -1 ||
              teacheraddress.indexOf(lowerCase) !== -1 ||
              teachercountry.indexOf(lowerCase) !== -1
            ) {
              tempArray.push(teacher);
            }
          }
          if (
            searchParameter === "currency" &&
            teacher.subject === this.state.selectedSubject
          ) {
            if (teacher.currency) {
              const teacherCurrency = teacher.currency.toLowerCase();
              if (teacherCurrency.indexOf(lowerCase) !== -1) {
                tempArray.push(teacher);
              }
            }
          }
        });
      });
      this.setState({
        filtredTeacherRecord: tempArray
      });
    } else {
      // console.log('searchParameter.TeacherList', searchParameter.TeacherList);
      this.setState({
        filtredTeacherRecord: searchParameter.TeacherList
      });
    }

    //this.props.getTeachersBasedOnCateogy(this.state.selectedSubject);
  };

  setfilteredTeacher = filteredRecords => {
    this.setState({
      filtredTeacherRecord: filteredRecords
    });
  };

  subjectChange = subjectValue => {
    this.setState({
      selectedSubject: subjectValue.target.value
    });
    this.props.getTeachersBasedOnCateogy(subjectValue.target.value);
  };

  render() {
    const { getTeacherZipWise } = this.props;

    if (getTeacherZipWise.zip_codes && getTeacherZipWise.zip_codes.length > 0) {
      console.log('--getTeachersBasedOnZipcode--', getTeacherZipWise.zip_codes);
    }

    this.state.filtredTeacherRecord.map((teacher, index) => {
      return (
        <div className="col-md-3" key={index}>
          <div className="card">
            <div className="card-body">
              <img
                src={teacher.profileImage}
                alt="teacher"
                className="profile-image"
              />
              <div className="container">
                <h4>
                  <b>
                    {teacher.firstName} {teacher.lastName}
                  </b>
                </h4>
                <p>{teacher.subject}</p>
              </div>
              <div className="input-group chat-btn">
                <input
                  type="button"
                  className="btn btn-success"
                  value="Initiate Chat"
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
    const searctTeacherData = [
      {
        name: "Name",
        value: "Name"
      },
      {
        name: "Location",
        value: "Location"
      },
      {
        name: "Rating",
        value: "rating"
      },
      {
        name: "Nearby location",
        value: "nearByLocation"
      }
    ];
    // console.log(this.state.filtredTeacherRecord,'this.state.filtredTeacherRecord in search teacher');
    return (
      <div className="teacher-student-search container-fluid">
        <div>
          <HeaderHome
            headeTitle="Student Dashboard"
          />
        </div>
        <div className="filter-search content-container--background">
          <p className="help-block validation-message">
            {this.state.showValidationMessage}
          </p>

          <div className="card">
            <div className="card-body">
              <div className="row row-without--margin">
                <div className=" filter-teacher add-padding col-xs-12 col-12 col-md-4">
                  <select
                    className="form-control"
                    onChange={this.subjectChange}
                    value={this.state.selectedSubject}
                  >
                    {this.state.categoryList.map(key => (
                      <option key={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-teacher col-xs-12 col-12 col-md-4">
                  <Multiselect
                    options={searctTeacherData}
                    onSelectOptions={this.handleChange}
                    placeHolder="filter by Categoty"
                  />
                </div>
                <div className="input-group search-teacher col-xs-12 col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.searchValue}
                    onChange={value => this.setSaerchValue(value)}
                    placeholder={"Search for.." + this.state.placeHolderValue}
                    name="srch-term"
                    id="srch-term"
                  />
                  <span
                    className="fa fa-search teacher-search-icon"
                    onClick={this.getSerachParameter}
                  />


                </div>
              </div>
            </div>
          </div>

          <div>
            {this.state.filtredTeacherRecord && (
              <div>
                <ListContainer
                  listType="Teacher"
                  itemList={this.state.filtredTeacherRecord}
                />
              </div>
            )}
            {this.state.filtredTeacherRecord.length === 0 && (
              <div className="col-12 text-center">
                <b>No Records Found.</b>
              </div>
            )}
          </div>
          {/* <div className="text-center">
            <ul className="list-group_1">
              { getTeacherZipWise.zip_codes &&
              getTeacherZipWise.zip_codes.length > 0 && 
              getTeacherZipWise.zip_codes
              .sort((a, b) => a.distance > b.distance)
              .map((teacherList , index) => (
              <li className="list-group-item bg-success" key={index}>
                Zipcode: {teacherList.zip_code} <br />
                Distance: {teacherList.distance}
              </li>
              ))}
           </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalSata: state.classes,
    carouselRows: state.carouselStore.carouselData,
    TeacherList: state.searchTeacher.teacherDetails,
    selectedSubjectFromHome: state.categoryItem.getSelectedSubj,
    getTeacherZipWise: state.searchTeacher.getTeacherList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTeachersBasedOnCateogy: selectedSubject =>
      dispatch(getTeachersBasedOnCateogy(selectedSubject)),
    getTeachersBasedOnZipcode: zipcode => dispatch(zipRequestDispatch(zipcode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTeacher);

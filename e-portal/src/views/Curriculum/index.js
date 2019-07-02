/*
This Component is use for file upload in storage for user id wise
and store metadata into curriculum table
mandatory props in this component
userDetails, heading, isUploadThumb,category
these are callback function to recieve error or success handleError, handleSuccess 
*/
import React, { Component } from "react";
import { connect } from "react-redux";

import firebase from "firebase";

import FileUploader from "react-firebase-file-uploader";
import { toastr } from "react-redux-toastr";

import Progress from "./progress";
import { CurriculumModel } from "./model";
import "./styles.scss";

import { saveFileMetaData } from "./actions";

class Curriculum extends Component {
  state = CurriculumModel;

  componentDidMount = () => {
    this.setState({ category: this.props.userDetails.subject });
    if (this.props.updateVideo) {
      const updateVideo = this.props.updateVideo;
      this.setState({ updateVideo });
    }
  };

  handleFileChange = (ev, type) => {
    const { target: { files } } = ev;
    if(files[0].type.split('/')[0] !== type){
      ev.target.value = '';      
      toastr.warning('', "Please Select Only "+ type.charAt(0)+type.slice(1) + ' files');
      return false;
    }
    return true;
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });


  handleProgress = progress => {
    this.setState({ progress }); }

  handleUploadError = error => {
    this.props.handleError(error);
    this.setState({ isUploading: false });
  };

  handleVideoUploadSuccess = fileName => {
    this.setState({ progress: 100, isUploading: false, video: true });
    this.props.saveFileMetaData(
      fileName,
      this.props.userDetails,
      "",
      "",
      "video"
    );
  };

  handleThumbUploadSuccess = fileName => {
    this.setState({ progress: 100, isUploading: false, thumbnail: false });
    this.props.saveFileMetaData(
      fileName,
      this.props.userDetails,
      this.props.updateVideo ? this.state.doc : this.props.docRef,
      "",
      "thumb"
    );
  };

  handleChange = async e => {
    this.setState({
      [e.id]: e.value
    });
    await this.formValidate(false);
  };

  formValidate = showWaring => {
    const fields = {};
    let check = true;
    for (const field of this.state.fields) {
      if (!this.state[field]) {
        if (showWaring) {
          toastr.warning(field, "Please Enter " + field);
        }
        check = false;
        break;
      }
      fields[field] = this.state[field];
    }
    this.setState({
      validate: check
    });
    return !check ? check : fields;
  };

  handleSubmit = async e => {
    const fields = await this.formValidate(true);

    if (fields) {
      this.props.saveFileMetaData(
        "",
        this.props.userDetails,
        this.props.updateVideo ? this.state.doc : this.props.docRef,
        fields,
        "metadata"
      );
      this.props.handleSuccess(true);
    } else {
      this.props.handleSuccess(false);
    }
    this.setState({ validate: false });
    e.preventDefault();
  };

  render() {
    const style = {
      backgroundColor: "#232838",
      color: "white",
      padding: 10,
      fontSize: "15px",
      borderRadius: 5,
      pointer: "cursor"
    };
    const { userDetails, heading, isUploadThumb, category } = this.props;
    return (
      <div className="col-12">
        <div className="card uplaod-video--background">
          <div className="card-header">
            <h6>{heading}</h6>
          </div>
          <div className="card-body">
            {userDetails && (
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="progressbar-spacing">
                  {this.state.isUploading && (
                    <>
                      <br />
                      <Progress
                        bgColor="#232838"
                        progress={this.state.progress}
                      />
                      <br />
                    </>
                  )}
                </div>
                {category && (
                  <div className="form-group row">
                    <label
                      htmlFor="category"
                      className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 col-form-label"
                    >
                      Category
                    </label>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <select
                        className="form-control"
                        id="category"
                        onChange={e => this.handleChange(e.target)}
                        value={this.state.category}
                      >
                        {category.map((cat, ind) => {
                          return (
                            <option key={ind} value={cat}>
                              {cat}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                )}
                <div className="form-group row">
                  <label
                    htmlFor="title"
                    className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 col-form-label"
                  >
                    Title
                  </label>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <input
                      value={this.state.title}
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Title"
                      onChange={e => this.handleChange(e.target)}
                      required
                    />
                    <div className="invalid-feedback">Please Enter Title</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="tags"
                    className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 col-form-label"
                  >
                    Tags
                  </label>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <input
                      value={this.state.tags}
                      type="text"
                      className="form-control"
                      id="tags"
                      placeholder="Math, Science"
                      onChange={e => this.handleChange(e.target)}
                      required
                    />
                    <div className="invalid-feedback">Please Enter Tags</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="desc"
                    className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <textarea
                      value={this.state.desc}
                      className="form-control"
                      id="desc"
                      rows="3"
                      onChange={e => this.handleChange(e.target)}
                      required
                    />
                    <div className="invalid-feedback">
                      Please Enter Description
                    </div>
                  </div>
                </div>
                <div className="progressbar-uploadspacing">
                  {!this.state.video && !this.state.isUploading && (
                    <div className="form-group row">
                      <label className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2" />
                      <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <label style={style} disabled={!this.state.validate}>
                          Upload Video
                          <FileUploader
                            disabled={!this.state.validate}
                            hidden
                            accept="video/*"
                            randomizeFilename="true"
                            /* filename={file => 
                              `${Math.random().toString(36).substring(2)}${(new Date()).getTime().toString(36)}_${file.name}`
                            } */
                            storageRef={firebase
                              .storage()
                              .ref(`curriculum/${userDetails.userId}`)}
/*                             onChange={(event) => this.handleFileChange(event, 'video')}
 */                            onUploadStart={(file, uploadTask) => this.handleUploadStart(file,uploadTask)}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleVideoUploadSuccess}
                            onProgress={this.handleProgress}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="progressbar-uploadthumbnail">
                  {isUploadThumb &&
                    this.state.video &&
                    this.state.thumbnail &&
                    !this.state.isUploading && (
                      <div className="form-group row">
                        <label className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2" />
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                          <label style={style}>
                            Upload Thumbnail
                            <FileUploader
                              hidden
                              accept="image/*"
                              randomizeFilename="true"
                              /* filename={file => 
                                `${Math.random().toString(36).substring(2)}${(new Date()).getTime().toString(36)}_${file.name}`
                              } */
                              storageRef={firebase
                                .storage()
                                .ref(`curriculum/${userDetails.userId}`)}
/*                               onChange={(event) => this.handleFileChange(event, 'image')}
 */                              onUploadStart={this.handleUploadStart}
                              onUploadError={this.handleUploadError}
                              onUploadSuccess={this.handleThumbUploadSuccess}
                              onProgress={this.handleProgress}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                </div>
                <div className="form-group row ">
                  <div className="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2" />
                  <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <button
                      type="submit"
                      disabled={!this.state.video}
                      className="btn btn-success"
                    >
                      Save
                    </button>
                    {!this.state.isUploading && this.props.children}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    docRef: state.curriculum.docRef,
    err: state.curriculum.err
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveFileMetaData: (fileName, user, docRef, fields, type) =>
      dispatch(saveFileMetaData(fileName, user, docRef, fields, type))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curriculum);

import React, { Component } from 'react';
import './style.css';
import { updateBlog, SaveBlog } from '../../../database/dal/firebase/TeacherBlog';
import Modal from 'react-responsive-modal';
import { openModal, closeModal } from './action'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';

import {
    getBlogsList
} from './action';

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTitle: ' ',
            blogDescription: ' ',
            blogImage: '',
            userDetails: '',
            validationMessage: '',
            imageName: '',
            isUploading: false,
            progress: 0, 
            updatingState : ''
        };
        this.openModalForBlog = this.openModalForBlog.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setBlogTitle = this.setBlogTitle.bind(this);
        this.setBlogDescription = this.setBlogDescription.bind(this);
        this.saveAsDraft = this.saveAsDraft.bind(this);
        this.finalSave = this.finalSave.bind(this);


    }
    setBlogTitle(event) {
        const setTitle = event.target.value;
        this.setState({
            blogTitle: setTitle
        })
    }


    setBlogDescription(event) {
        const setDescription = event;
        this.setState({
            blogDescription: setDescription
        })
    }


    randomString(length) {
        var text = "";
        var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    componentDidMount() {
        this.props.getBlogsList();
        const userDetails = JSON.parse(localStorage.getItem('userProfile'))
        this.setState({
            userDetails: userDetails,
            validationMessage: ''
        })
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });



    openModalForBlog() {
        this.props.openModal()
    }

    closeModal() {
        this.props.closeModal()
    }

    componentWillReceiveProps (nextProps){
        if(nextProps.blogDetails){
        this.setState({
            blogTitle: nextProps.blogDetails.blogTitle,
            blogDescription : nextProps.blogDetails.blogDescription
        })
    }
    }

    handleImageSuccess = fileName => {
        this.setState({
            imageName: fileName,
            progress: 100,
            isUploading: false,
            validationMessage: ""
        });
    };

    saveAsDraft() {
        if (this.state.blogTitle === '' || this.state.blogDescription === " ") {
            this.setState({
                validationMessage: 'Blog Title or Blog Description can not be empty'
            })
            return
        }
        this.setState({
            validationMessage: ' '
        })
        let id ='';
        if(!this.props.detailPage){
             id = this.randomString(20);
        }
        else{
            id = this.props.blogDetails.id
        }
        const blogObj = {};

        blogObj.id = id;
        blogObj.teacherId = this.state.userDetails.userId
        blogObj.uploadedImage = '';
        blogObj.blogDescription = this.state.blogDescription;
        blogObj.blogTitle = this.state.blogTitle;
        blogObj.aStatus = false;
        blogObj.tStatus = 'Draft';
        blogObj.tImage = this.state.userDetails.profileImage;
        blogObj.Trating = this.state.userDetails.rating;
        if(!this.props.detailPage){
            SaveBlog(blogObj);
        }
        else{
            updateBlog(blogObj);
            
        }

        this.props.closeModal()
        // if(this.props.detailPage){
           
        //     this.props.history.push('/blog/list')
        // }
    }


    finalSave() {
        if (this.state.blogTitle === '' || this.state.blogDescription === " ") {
            this.setState({
                validationMessage: 'Blog Title or Blog Description can not be empty'
            })
            return
        }
        this.setState({
            validationMessage: ' '
        })
        let id ='';
        if(!this.props.detailPage){
             id = this.randomString(20);
        }
        else{
            id = this.props.blogDetails.id
        }
        
        const blogObj = {};

        blogObj.id = id;
        blogObj.teacherId = this.state.userDetails.userId
        blogObj.uploadedImage = '';
        blogObj.blogDescription = this.state.blogDescription;
        blogObj.blogTitle = this.state.blogTitle;
        blogObj.aStatus = false;
        blogObj.tStatus = 'Submitted';
        blogObj.tImage = this.state.userDetails.profileImage;
        blogObj.Trating = this.state.userDetails.rating;
        if(!this.props.detailPage){
            SaveBlog(blogObj);
        }
        else{
            updateBlog(blogObj)
        }
        // if(this.props.detailPage){
            
        //     this.props.history.push('/blog/list')
        // }

        this.props.closeModal()
    }
    render() {
        const { modalState } = this.props

        return (
            <>
                <button className="btn btn-dark pull-right" onClick={this.openModalForBlog}><i className="fa fa-plus"></i>Create Article</button>
                <Modal open={modalState} onClose={this.props.closeModal} center>
                    <h2>Create Blog</h2>
                    <span className="red-star">*</span>
                    <input type="text"
                        className="form-control"
                        placeholder="Blog Title"
                        
                        onChange={this.setBlogTitle}
                        value = {this.state.blogTitle}
                    />

                    <span className="red-star">*</span>
                    <ReactQuill
                        placeholder="Blog Description"
                        onChange={this.setBlogDescription}
                        value={this.state.blogDescription}
                    />
                    <div className="col-lg-12 rm-padding">
                        <div className="mr-top">
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <p className="red-star">{this.state.validationMessage}</p>

                    </div>
                    <div className="col-lg-12">
                        <button className="btn btn btn-dark btn-sm space pull-right"
                            disabled={this.state.isUploading}
                            onClick={this.finalSave}>Submit</button>
                        <button className="btn btn btn-dark btn-sm space pull-right"
                            disabled={this.state.isUploading}
                            onClick={this.saveAsDraft} >Save As Draft</button>

                    </div>
                </Modal>
            </>
        );
    }
}



const mapStateToProps = state => {
    return {
        notificationDetails:
            state.notificationAcceptREducer.notificationDetailsByID[0],
        modalState: state.category.openModal,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getBlogsList: () => dispatch(getBlogsList()),
        closeModal: () => dispatch(closeModal()),
        openModal: () => dispatch(openModal())
    }
};

export default
withRouter(connect(
        mapStateToProps,
        mapDispatchToProps
    )(BlogList));




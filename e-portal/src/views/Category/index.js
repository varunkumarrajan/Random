import React, { Component } from "react"
import { connect } from "react-redux"
import { TreeView } from "@progress/kendo-react-treeview"
import Modal from 'react-responsive-modal'
import Header from "../../components/layout/header/Header"
import { toastr } from 'react-redux-toastr'

import "@progress/kendo-theme-default/dist/all.css"
import "./styles.css"

import { openModal, closeModal, getCategory, manageCategory } from './action'
import { SelectedNode } from './model'
import { CATEGORY } from './../../constant/Constant'

class Category extends Component {

    state = SelectedNode;
    selectedItem = null;

    componentWillMount = () => {
        this.props.closeModal();
    }
    
    componentDidMount = () => {
        this.props.getCategory();
    }
  
    componentWillUnmount = () => {
        this.props.closeModal();
        this.props = null;
    }

    onItemClick = async (event) => {               
        await this.selectCurrentNode(event);
        this.setState({
            selectedNode: (event.item.text) ? event.item.text : '',
            selectedNodeIndex: (event.itemHierarchicalIndex) ? event.itemHierarchicalIndex : '' 
        })
        this.forceUpdate();
    }

    selectCurrentNode = (e) => {
        if (this.selectedItem)
        this.selectedItem.selected = false;

        e.item.selected = true;
        this.selectedItem = e.item;   
    }

    onExpandChange = event => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();
    }

    handleCategory = type => {
        this.setState({
            categoryType: type,
            [type.toLowerCase()]: (type === CATEGORY.TYPE.EDIT) ? this.state.selectedNode : ''
        })
        this.props.openModal()
    }
    
    handleInputChange = (e) => {
        this.setState({
          [e.id]: e.value
        })
    }
    
    manageCategory = () => {
        if (this.state.categoryType !== CATEGORY.TYPE.DELETE && !this.checkStateIsEmpty()) {
            return false;
        }
        if (this.selectedItem)
        this.selectedItem.selected = false;
        this.props.manageCategory(this.props.tree, this.state)
        this.props.closeModal();
    }
    
    checkStateIsEmpty = () => {
        if (!this.state[this.state.categoryType.toLowerCase()]) {
            toastr.warning(this.state.categoryType, CATEGORY.EMPTY_MSG);
            return false;
        }
        return true;
    }

    render = () => {  
        const { tree, modalState } = this.props
        const checkBoth = this.state.categoryType === CATEGORY.TYPE.ADD 
                        || this.state.categoryType === CATEGORY.TYPE.EDIT       
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <Header headeTitle="Curriculum" />
                    </div>
                </div>          
                <div className="row justify-content-md-center">
                    <div className="col-sm-6 col-md-6 col-lg-6 adjust-top">
                        <h5>{CATEGORY.HEADING}</h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="col-lg-6 pull-left">
                                    { tree && (
                                        <TreeView
                                            data={tree}
                                            expandIcons={true}
                                            onExpandChange={this.onExpandChange}
                                            onItemClick={this.onItemClick}
                                            aria-multiselectable={false}
                                        />
                                    )}
                                </div>
                                <div className="col-lg-6 pull-right">
                                    { this.state.selectedNodeIndex && (                             
                                        <div className="pull-right">
                                            <button 
                                                type="button" 
                                                title={CATEGORY.TYPE.ADD} 
                                                className="btn btn-outline-primary btn-sm space" 
                                                onClick={() => this.handleCategory('ADD')}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                            { this.state.selectedNodeIndex !== '0' && (
                                                <>
                                                <button 
                                                type="button" 
                                                title={CATEGORY.TYPE.EDIT}
                                                className="btn btn-outline-primary btn-sm space" 
                                                onClick={() => this.handleCategory('EDIT')}>
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                                </button>
                                                <button 
                                                type="button" 
                                                title={CATEGORY.TYPE.DELETE}
                                                className="btn btn-outline-primary btn-sm space" 
                                                onClick={() => this.handleCategory('DELETE')}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal open={modalState} onClose={this.props.closeModal} center>
                        { checkBoth && (
                            <>
                                <div className="form-group">
                                    <label htmlFor={this.state.categoryType.toLowerCase()}>{this.state.categoryType } {CATEGORY.SUBHEADING.toUpperCase()}</label>
                                    <input id={this.state.categoryType.toLowerCase()} type="text" 
                                        className="form-control" placeholder={this.state.categoryType} 
                                        value={this.state[this.state.categoryType.toLowerCase()]} 
                                        onChange={(e) => this.handleInputChange(e.target)} />
                                </div>
                                <button className="btn btn-outline-primary btn-sm space" onClick={() => this.manageCategory()}>{this.state.categoryType}</button>
                            </>
                        )}
                        {this.state.categoryType === CATEGORY.TYPE.DELETE && (
                            <>
                                <div className="col-12">
                                    <br/>
                                    <h6>{CATEGORY.DELETE_MSG}</h6>
                                    <br/>
                                </div>                            
                                <button className="btn btn-outline-primary btn-sm space" onClick={() => this.manageCategory()}>{this.state.categoryType}</button>                        
                            </>
                        )}
                        <button className="btn btn-outline-primary btn-sm space" onClick={this.props.closeModal}>Cancel</button>                        
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        tree: state.category.tree,
        modalState: state.category.openModal,
        error: state.category.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        getCategory: () => dispatch(getCategory()),
        manageCategory: (tree, state) => dispatch(manageCategory(tree, state)),        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);

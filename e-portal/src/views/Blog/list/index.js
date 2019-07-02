import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router';
import BlogList from './../create'
import InfiniteScroll from 'react-infinite-scroll-component';
import renderHTML from 'react-render-html';
import FilterByDate from '../../../shared/components/filter-by-date';
// import Pagination from "react-js-pagination"

import { getBlogListFromDBOrCount, deleteBlogFromDB } from './../../../database/dal/firebase/TeacherBlog'
// Color Constant
import { COLOR } from './../../../constant/Constant'

import './list.scss'

import HeaderHome from '../../../components/layout/header/HeaderHome'

class BList extends Component {

    state = {
        blogs: [],
        currentPage: 1,
        itemsPerPage: 3,
        totalItemCount: 1,
        activePage: 15
    }

    UNSAFE_componentWillMount = () => {
        this.setState({
            userDetails: JSON.parse(localStorage.getItem("userProfile"))
        });
    };

    componentDidMount = async () => {
        await this.getBlogList();
    }

    componentDidUpdate = (prevProps, prevState) => {
        const isDifferentPage = this.state.currentPage !== prevState.currentPage
        if (isDifferentPage) this.getBlogList()
    }

    componentWillUnmount = () => {
        this.state = null;
    }

    handleClick = (id, type) => {
        (type === 'view') ? this.viewBlog(id) : this.deleteBlog(id)
    }

    viewBlog = (viewId) => {
        this.setState({ viewId });
        //this.props.history.push({`/blog/view/${viewId}`, state :{id: }})
        this.props.history.push({
            pathname: `/blog/view/${viewId}`,
            state: {
                id: viewId

            }
        })
    }

    deleteBlog = (id) => {
        deleteBlogFromDB(id);
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
    }

    getDateParameter = () => {
        this.setState({
            blogs: this.state.blogs.reverse()
        })
    }

    getBlogList = () => {
        const { currentPage, itemsPerPage } = this.state;
        const startAt = currentPage * itemsPerPage - itemsPerPage;

        getBlogListFromDBOrCount(startAt, itemsPerPage, true).onSnapshot(querySnapshot => {
            let blogs = [];
            querySnapshot.forEach(doc => {
                blogs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            this.setState({ blogs });
        });

        getBlogListFromDBOrCount('', '', true).onSnapshot(querySnapshot => {
            let totalItemCount = 0;
            querySnapshot.forEach(() => {
                totalItemCount++;
            });
            this.setState({ totalItemCount });
        });
    }

    render = () => {
        const { blogs, userDetails, viewId/*  activePage, itemsPerPage, totalItemCount */ } = this.state;
        return (
            <div className="container-fluid">
                <HeaderHome headeTitle="Blog List" />
                <Row className="content-container main-wrapper">
                    <Col sm={6}>
                        <FilterByDate onChangeDate={this.getDateParameter} />
                    </Col>
                    <Col sm={6}>
                        <BlogList />
                    </Col>
                    <Col sm={12}>
                        <Card>
                            {/* <Card.Header>All Blogs List</Card.Header> */}
                            <Card.Body className="card-body-background">
                                {blogs && blogs.map((blog, index) => {
                                    return (
                                        <Col sm={12} key={index}>
                                            <Card border={COLOR[Math.floor(Math.random() * COLOR.length)]}>
                                                <Card.Body>
                                                    <Card.Title>{blog.blogTitle}</Card.Title>
                                                    {renderHTML(blog.blogDescription)}
                                                    {(userDetails && userDetails.userId === blog.teacherId) && (
                                                        <>
                                                            <Button variant="outline-info" onClick={() => this.handleClick(blog.id, 'view')}><i className="fa fa-eye" /></Button>
                                                            <Button variant="outline-danger" onClick={() => this.handleClick(blog.id, 'delete')}><i className="fa fa-trash" /></Button>
                                                        </>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                                {blogs.length === 0 && <h6>No Blogs</h6>}
                            </Card.Body>
                            {/* <Card.Footer> */}
                            {/* <Pagination
                                className="pagination"
                                activePage={activePage}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={totalItemCount}
                                pageRangeDisplayed={itemsPerPage}
                                onChange={this.handlePageChange}
                            /> */}
                            {/* </Card.Footer> */}
                        </Card>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default withRouter(BList);




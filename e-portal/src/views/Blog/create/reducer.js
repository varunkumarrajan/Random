const initialState = {
    BlogList: [],
    openModal: false,
}
const BlogDetailsREducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BLOGSLIST':
            return {
                ...state,
                BlogList: action.BlogsListData
            };
        case 'CLOSE':
            return {
                ...state,
                openModal: !state.openModal
            }
        case 'OPEN':
            return {
                ...state,
                openModal: !state.openModal
            }

        default:
            return state
    }
}
export default BlogDetailsREducer;
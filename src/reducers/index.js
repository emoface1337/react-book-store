const initialState = {
    books: [],
    isLoading: true
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'BOOKS_LOADED':
            return {
                ...state,
                books: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer
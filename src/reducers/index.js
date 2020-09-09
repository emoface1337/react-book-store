const initialState = {
    books: [],
    isLoading: true,
    error: null,
    cartItems: [],
    orderTotalPrice: 250
}

const updateCartItems = (cartItems, item, idx) => {
    if (idx === -1) {
        return [
            ...cartItems,
            item
        ]
    }
    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ]
}

const updateCartItem = (book, item = {}) => {

    const { id = book.id, count = 0, title = book.title, itemTotalPrice = 0 } = item

    return {
        id,
        title,
        count: count + 1,
        itemTotalPrice: itemTotalPrice + book.price
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_BOOKS_REQUESTED':
            return {
                ...state,
                books: [],
                isLoading: true,
                error: null
            }

        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                isLoading: false,
                error: null
            }

        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                isLoading: false,
                error: action.payload
            }

        case 'ADD_BOOK_TO_CART': {
            const bookId = action.payload
            const book = state.books.find((book) => book.id === bookId)
            const itemIndex = state.cartItems.findIndex(({ id }) => id === bookId)
            const item = state.cartItems[itemIndex]

            const newItem = updateCartItem(book, item)

            return {
                ...state,
                cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
            }
        }

        default:
            return state
    }
}

export default reducer
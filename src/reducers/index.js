const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

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

const updateCartItem = (book, item = {}, quantity) => {

    const { id = book.id, count = 0, title = book.title, itemTotalPrice = 0 } = item

    return {
        id,
        title,
        count: count + quantity,
        itemTotalPrice: itemTotalPrice + quantity * book.price
    }
}

const updateOrder = (state, bookId, quantity) => {
    const { bookList: { books }, shoppingCart: { cartItems } } = state

    const book = books.find(({ id }) => id === bookId)
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId)
    const item = cartItems[itemIndex]

    const newItem = updateCartItem(book, item, quantity)

    return {
        orderTotalPrice: 0,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    }
}

const updateBookList = (state, action) => {

    if (state === undefined) {
        return {
            books: [],
            isLoading: true,
            error: null
        }
    }
    switch (action.type) {
        case 'FETCH_BOOKS_REQUESTED':
            return {
                books: [],
                isLoading: true,
                error: null
            }

        case 'FETCH_BOOKS_SUCCESS':
            return {
                books: action.payload,
                isLoading: false,
                error: null
            }

        case 'FETCH_BOOKS_FAILURE':
            return {
                books: [],
                isLoading: false,
                error: action.payload
            }

        default:
            return state.bookList
    }
}

const updateShoppingCart = (state, action) => {

    if (state === undefined) {
        return {
            cartItems: [],
            orderTotalPrice: 0
        }
    }
    switch (action.type) {
        case 'ADD_BOOK_TO_CART': {
            return updateOrder(state, action.payload, 1)
        }

        case 'REMOVE_BOOK_FROM_CART': {
            return updateOrder(state, action.payload, -1)
        }

        case 'REMOVE_ALL_BOOKS_FROM_CART': {
            const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload)
            return updateOrder(state, action.payload, -item.count)
        }

        default:
            return state.shoppingCart
    }
}

const reducer = (state, action) => {

    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    }

}

export default reducer
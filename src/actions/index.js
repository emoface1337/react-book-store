const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUESTED'
    }
}

const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
}

const booksError = error => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
}

export const fetchBooks = (bookstoreService, dispatch) => () => {
    dispatch(booksRequested())
    bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((error) => dispatch(booksError(error)))
}

export const addBookToCart = bookId => {
    return {
        type: 'ADD_BOOK_TO_CART',
        payload: bookId
    }
}

export const removeBookFromCart = bookId => {
    return {
        type: 'REMOVE_BOOK_FROM_CART',
        payload: bookId
    }
}

export const removeAllBooksFromCart = bookId => {
    return {
        type: 'REMOVE_ALL_BOOKS_FROM_CART',
        payload: bookId
    }
}


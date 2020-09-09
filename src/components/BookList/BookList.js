import React, { Component } from 'react'
import { connect } from 'react-redux'
import withBookstoreService from '../hoc/withBookstoreService'
import compose from '../../utils'
import { fetchBooks, addBookToCart } from '../../actions/index'

import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

const BookList = ({ books, onAddToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map(book => (
                        <li key={book.id}>
                            <BookListItem book={book} onAddToCart={() => onAddToCart(book.id)}/>
                        </li>
                    )
                )
            }
        </ul>
    )
}

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, isLoading, error, onAddToCart } = this.props

        if (isLoading)
            return <Spinner/>
        if (error)
            return <ErrorIndicator/>

        return <BookList books={books} onAddToCart={onAddToCart}/>
    }
}


const mapStateToProps = ({ books, isLoading, error }) => ({
    books,
    isLoading,
    error
})

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddToCart: (id) => dispatch(addBookToCart(id))
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)
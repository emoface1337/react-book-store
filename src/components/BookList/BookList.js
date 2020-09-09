import React, { Component } from 'react'
import { connect } from 'react-redux'
import withBookstoreService from '../hoc/withBookstoreService'
import compose from '../../utils'
import fetchBooks from '../../actions/index'

import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

class BookList extends Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, isLoading, error } = this.props

        if (isLoading)
            return <Spinner/>
        if (error)
            return <ErrorIndicator/>

        return (
            <ul className="book-list">
                {
                    books.map(book => (
                            <li key={book.id}><BookListItem book={book}/></li>
                        )
                    )
                }
            </ul>
        )
    }
}

const mapStateToProps = ({ books, isLoading, error }) => ({
    books,
    isLoading,
    error
})

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch)
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
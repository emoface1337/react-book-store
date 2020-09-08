import React, { Component } from 'react'
import { connect } from 'react-redux'
import withBookstoreService from '../hoc/withBookstoreService'
import compose from '../../utils'
import booksLoaded from '../../actions/index'

import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'
import Spinner from '../Spinner/Spinner'

class BookList extends Component {

    componentDidMount() {
        const { bookstoreService, booksLoaded } = this.props
        bookstoreService.getBooks()
        .then((data) => booksLoaded(data))
    }

    render() {
        const { books, isLoading } = this.props
        if (isLoading)
            return <Spinner/>

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

const mapStateToProps = ({ books, isLoading }) => ({
    books,
    isLoading
})

const mapDispatchToProps = {
    booksLoaded
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
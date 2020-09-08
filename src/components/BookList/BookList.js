import React, { Component } from 'react'
import { connect } from 'react-redux'
import withBookstoreService from '../hoc/withBookstoreService'
import compose from '../../utils'
import booksLoaded from '../../actions/index'

import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'

class BookList extends Component {

    componentDidMount() {
        const { bookstoreService } = this.props
        const data = bookstoreService.getBooks()
        this.props.booksLoaded(data)
    }

    render() {
        const { books } = this.props
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

const mapStateToProps = ({ books }) => ({
    books
})

const mapDispatchToProps = {
    booksLoaded
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
import React from 'react'
import { BookstoreServiceConsumer } from '../BookstoreServiceContext/BookstoreServiceContext'

const WithBookstoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        return (
                            <Wrapped {...props} bookstoreSerivce={bookstoreService}/>
                        )
                    }
                }
            </BookstoreServiceConsumer>
        )
    }
}

export default WithBookstoreService
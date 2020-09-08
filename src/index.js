import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import BookstoreService from './services/bookstore-service'
import { BookstoreServiceProvider } from './components/BookstoreServiceContext/BookstoreServiceContext'

import store from './store'

const bookstoreService = new BookstoreService()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary>
                <BookstoreServiceProvider value={bookstoreService}>
                    <Router>
                        <App/>
                    </Router>
                </BookstoreServiceProvider>
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
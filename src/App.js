import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, Cart } from './components/pages'
import Header from './components/Header/Header'

const App = () => {
    return (
        <main role="main" className="container">
            <Header numItems={5} total={210}/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/cart' exact component={Cart}/>
            </Switch>
        </main>
    )
}

export default App
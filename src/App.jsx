import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import RepoDetails from './Components/RepoDetails/RepoDetails'
import SearchContainer from './Components/RepoSearch/SearchContainer'

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path='/' component={SearchContainer} />
                <Route path='/details/:id' component={RepoDetails} />
            </div>
        </Router>
    )
}

export default App

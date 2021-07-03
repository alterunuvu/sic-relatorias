import React from 'react'
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import HomeView from '../views/HomeView'
import ResultsView from '../views/ResultsView';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path={`/`} component={HomeView} />
                <Route path={`/results`} component={ResultsView} />
                <Route path={`/*`}>
                    <Redirect to={`/`} />
                </Route>
            </Switch>
        </Router>
    )
}

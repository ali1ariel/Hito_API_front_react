import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import Show from './pages/Show'
import NewPerson from './pages/NewPerson'
import Main from "./pages/Main"
import EditPerson from "./pages/EditPerson";


export default function Routes() {
  return(
    <Router>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/persons" exact component={Main}/>
          <Route path="/persons/new" exact component={NewPerson}/>
          <Route path="/persons/:id" exact component={Show}/>
          <Route path="/persons/:id/edit" exact component={EditPerson}/>
        </Switch>
      </Router>
  )
}
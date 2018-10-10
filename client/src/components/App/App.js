import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import Home from "../Home/Home"
import Docs from "../Common/Docs/Docs"
import DocsAdd from '../DocsAdd/DocsAdd'
import Login from '../Login/Login'
import Footer from '../Common/Footer/Footer'
import "./App.css"


const Basic = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/node/:title" component={Docs}/>
      <Route path="/dapp/:title" component={Docs}/>
      <Route path="/questions/:title" component={Docs}/>
      <Route path="/add" component={DocsAdd}/>
      <Route path="/login/" component={Login}/>
        <Footer />
    </div>
  </Router>
)


export default Basic

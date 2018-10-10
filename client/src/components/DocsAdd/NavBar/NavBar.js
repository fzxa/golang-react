import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            "titleURL" : this.props.title
        }
    }
    componentWillMount(){

    }
    render() {
        return(
            <div className="doc-left">
                <div className="nav-bar">
                    <h3>GETTING STARTED</h3>
                    <ul>
                        <li><Link to={'/node/overview'}>Overview</Link></li>
                        <li><Link to={'/node/docker-quickstart'}>Docker Quickstart</Link></li>
                        <li><Link to={'/node/accounts-and-permissions'}>Overview</Link></li>
                        <li className="on"><a href="/node/overview">Overview</a></li>
                        <li><a href="/node/docker-quickstart">Docker Quickstart</a></li>
                        <li><a href="/node/accounts-and-permissions">Accounts and Permissions</a></li>
                        <li><a href="/node/accounts-and-permissions">Smart Contract</a></li>
                    </ul>
                    <h3>GETTING STARTED</h3>
                    <ul>
                        <li><Link to={'/node/overview'}>Overview</Link></li>
                        <li><Link to={'/node/docker-quickstart'}>Docker Quickstart</Link></li>
                        <li><Link to={'/node/accounts-and-permissions'}>Overview</Link></li>
                        <li><a href="/node/overview">Overview</a></li>
                        <li><a href="/node/docker-quickstart">Docker Quickstart</a></li>
                        <li><a href="/node/accounts-and-permissions">Accounts and Permissions</a></li>
                        <li><a href="/node/accounts-and-permissions">Smart Contract</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default NavBar;
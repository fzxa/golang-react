import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom'

class NodeBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "titleURL": this.props.title,
            "match": this.props.match
        }
    }
    componentWillReceiveProps(nextProps) {


    }
    componentWillMount() {

    }

    render() {
        return (
            <div className="doc-left">
                <div className="nav-bar">
                    <h3>Installation</h3>
                    <ul>
                        <li><NavLink to={`/node/mac-os-x`} activeClassName="on">Mac OS X</NavLink></li>
                        <li><NavLink to={`/node/linux`} activeClassName="on">Linux</NavLink></li>
                        <li><NavLink to={`/node/docker`} activeClassName="on">Docker</NavLink></li>
                        <li><NavLink to={`/node/snapshot`} activeClassName="on">Snapshot</NavLink></li>
                        <li><NavLink to={`/node/install-faq`} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Configuration</h3>
                    <ul>
                        <li><NavLink to={`/node/conf-genesis`} activeClassName="on">Genesis Conf</NavLink></li>
                        <li><NavLink to={`/node/conf-node`} activeClassName="on">Node Conf</NavLink></li>
                        <li><NavLink to={`/node/conf-faq`} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Setup</h3>
                    <ul>
                        <li><NavLink to={`/node/setup-mainnet`} activeClassName="on">MainNet</NavLink></li>
                        <li><NavLink to={`/node/setup-testnet`} activeClassName="on">TestNet</NavLink></li>
                        <li><NavLink to={`/node/setup-privatenet`} activeClassName="on">PrivateNet</NavLink></li>
                        <li><NavLink to={`/node/setup-faq`} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>API</h3>
                    <ul>
                        <li><NavLink to={`/node/api-user`} activeClassName="on">User API</NavLink></li>
                        <li><NavLink to={`/node/api-admin`} activeClassName="on">Admin API</NavLink></li>
                        <li><NavLink to={`/node/api-faq`} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Command</h3>
                    <ul>
                        <li><NavLink to={`/node/command-console`} activeClassName="on">Console</NavLink></li>
                        <li><NavLink to={`/node/command-account`} activeClassName="on">Account</NavLink></li>
                        <li><NavLink to={`/node/command-faq`} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Release</h3>
                    <ul>
                        <li><NavLink to={`/node/release-latest`} activeClassName="on">Latest</NavLink></li>
                        <li><NavLink to={`/node/release-history`} activeClassName="on">History</NavLink></li>
                        <li><NavLink to={`/node/release-faq`} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                </div >
            </div >
        )
    }
}
export default NodeBar;
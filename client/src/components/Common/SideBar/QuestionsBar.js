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
                    <h3>Questions</h3>
                    <ul>
                        <li><NavLink to={`/questions/faq`} activeClassName="on">FQA</NavLink></li>
                    </ul>

                </div>
            </div>
        )
    }
}
export default NodeBar;
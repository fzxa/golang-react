import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Icon} from 'antd'

import './Footer.less'


class Footer extends Component {
    render() {
        return (
            <footer className="clearfix">
                <div className="left">
                    <div className="wrap">
                        <p>
                            <a href="https://nebulas.io" target="_blank">Home</a>
                            <a href="https://nebulas.io/incentive.html" target="_blank">Incentive</a>
                            <a href="https://nebulas.io/technology.html" target="_blank">Technology</a>

                            <a href="https://nebulas.io/community.html" target="_blank">community</a>
                            <a href="https://labs.nebulas.io/" target="_blank">Labs</a>
                            <a href="https://nebulas.io/team.html" target="_blank">Team</a>
                            <a href="https://nebulas.io/jobs.html" target="_blank">Jobs</a>
                            <a href="https://nebulas.io/resources.html" target="_blank">Resources</a>
                        </p>
                        <p>contact@nebulas.io</p>
                        <p>
                            <span>Copyright &copy; 2016 - 2018 Nebulas.io</span>
                        </p>
                    </div>
                </div>
                <div className="right">
                    &nbsp;
                </div>
            </footer>
        );
    }
}

export default Footer;

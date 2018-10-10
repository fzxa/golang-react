import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Avatar } from 'antd';
import './Header.less';
import Logo from './image/nebulasx60.png'

class Header extends Component {
    render() {
        return (
            <header>
                <div className="header-wrap clear">
                    <div className="logo">
                        <a href="/"><img src={Logo} alt="Nebulas" /></a>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={'/dapp/tutorial-compare'}>DApp</Link>
                            </li>
                            <li>
                                <Link to={"/node/mac-os-x"}>Node</Link>
                            </li>
                            <li>
                                <a href="//explorer.nebulas.io" target="_blank">Explorer</a>
                            </li>
                            <li>
                                <Link to="/questions/faq">Q&A</Link>
                            </li>
                            <li>
                                <Link to={'/login'}> <Avatar icon="user"  /></Link>
                            </li>
                        </ul>

                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


class DappBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "titleURL": this.props.title
        }
    }
    componentWillMount() {

    }
    render() {
        return (
            <div className="doc-left">
                <div className="nav-bar">
                    <h3>Get Started</h3>
                    <ul>
                        <li><NavLink to={'/dapp/tutorial-compare'} activeClassName="on">DApp vs. App</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-create-wallet'} activeClassName="on">Create Wallet</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-claim'} activeClassName="on">Claim Token</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-deploy-contract'} activeClassName="on">Deploy Contract</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-develop-frontend'} activeClassName="on">Develop Frontend</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-submit-tx'} activeClassName="on">Submit Transaction</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-query-info'} activeClassName="on">Query Information</NavLink></li>
                        <li><NavLink to={'/dapp/tutorial-faq'} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Advanced Features</h3>
                    <ul>
                        <li><NavLink to={'/dapp/feature-storage'} activeClassName="on">Local Storage</NavLink></li>
                        <li><NavLink to={'/dapp/feature-event'} activeClassName="on">Events</NavLink></li>
                        <li><NavLink to={'/dapp/feature-blockchain'} activeClassName="on">Blockchain API</NavLink></li>
                        <li><NavLink to={'/dapp/feature-accept'} activeClassName="on">Accept</NavLink></li>
                        <li><NavLink to={'/dapp/feature-random'} activeClassName="on">Random</NavLink></li>
                        <li><NavLink to={'/dapp/feature-inner-tx'} activeClassName="on">Inner Transaction</NavLink></li>
                        <li><NavLink to={'/dapp/feature-lib'} activeClassName="on">Library</NavLink></li>
                        <li><NavLink to={'/dapp/feature-faq'} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>SDK</h3>
                    <ul>
                        <li><NavLink to={'/dapp/sdk-install'} activeClassName="on">Installation</NavLink></li>
                        <li><NavLink to={'/dapp/sdk-acc'} activeClassName="on">Account</NavLink></li>
                        <li><NavLink to={'/dapp/sdk-tx'} activeClassName="on">Transaction</NavLink></li>
                        <li><NavLink to={'/dapp/sdk-neb'} activeClassName="on">Neb</NavLink></li>
                        <li><NavLink to={'/dapp/sdk-faq'} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Nebpay</h3>
                    <ul>
                        <li><NavLink to={'/dapp/nebpay-protocol'} activeClassName="on">Protocol</NavLink></li>
                        <li><NavLink to={'/dapp/nebpay-installation'} activeClassName="on">Installation</NavLink></li>
                        <li><NavLink to={'/dapp/nebpay-auth'} activeClassName="on">Auth</NavLink></li>
                        <li><NavLink to={'/dapp/nebpay-payment'} activeClassName="on">Payment</NavLink></li>
                        <li><NavLink to={'/dapp/nebpay-receipt'} activeClassName="on">Receipt</NavLink></li>
                        <li><NavLink to={'/dapp/nebpay-faq'} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                    <h3>Standard Tokens</h3>
                    <ul>
                        <li><NavLink to={'/dapp/token-nrc20'} activeClassName="on">NRC20</NavLink></li>
                        <li><NavLink to={'/dapp/token-nrc721'} activeClassName="on">NRC721</NavLink></li>
                        <li><NavLink to={'/dapp/token-faq'} activeClassName="on">FAQ</NavLink></li>
                    </ul>
                </div>
            </div >
        )
    }
}

export default DappBar;
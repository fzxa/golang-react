import qs from 'querystring'
import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import Header from '../Common/Header/Header'
import LoginForm from './LoginForm/LoginForm';



class Login extends React.Component {

    constructor(props){
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
    }


    handleSuccess() {
        this.props.history.push("/");
    }

    render() {
        
        return (
            <div>
                <Header />
                <LoginForm handleSuccess={this.handleSuccess} />
            </div>
        );
    }
}

export default Login;
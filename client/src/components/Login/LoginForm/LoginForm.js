import qs from 'querystring'
import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import Instance from "../../../service/instance.service"

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {

    handleSubmit = (e) => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                let username = values.userName;
                let password = values.password;
                let params = qs.stringify({"username":username, "password": password});

                Instance.get("/api/login?"+params).then( (response)=> {
                    let data = response.data;

                    if (data.code !== 0){
                        message.error(data.msg);
                    } else {
                        message.success("Success");
                        setTimeout(()=>{
                            _this.props.handleSuccess();
                        }, 2000)

                    }
                })
                .catch(function (error) {
                    message.error(error.message);
                })

            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={{ 'max-width': '300px', margin:' 150px auto'}}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" defaultValue="nebulas" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" defaultValue="qwe123"  />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}

                    <Button type="primary" htmlType="submit" className="login-form-button"  style={{width: '100%'}}>
                        Log in
                    </Button>

                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
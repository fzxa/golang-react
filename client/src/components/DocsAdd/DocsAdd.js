import qs from 'querystring'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import {Icon, message, Button, Breadcrumb, Cascader, Input} from 'antd'

import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'
import 'react-markdown/'

import axios from 'axios'

import Header from '../Common/Header/Header'
import NavBar from './NavBar/NavBar'


import "./DocsAdd.less"



const options = [
    {
        value: '1',
        label: 'Node',
        children: [
            {
                value: '4',
                label: 'Installation',
                children: [{
                    value: '14',
                    label: 'For Mac OS X',
                },{
                    value: '15',
                    label: 'For Linux',
                },{
                    value: '16',
                    label: 'For Docker',
                },{
                    value: '17',
                    label: 'Snapshot',
                }],
            },
            {
                value: '5',
                label: 'Usage',
                children:[{
                    value:'18',
                    label: 'Build'
                },{
                    value:'19',
                    label: 'Configuration',
                    children:[
                        {
                            value:'26',
                            label:'Genesis conf'
                        },
                        {
                            value:'27',
                            label:'Node conf'
                        }
                    ]
                },{
                    value:'20',
                    label: 'Network',
                    children:[
                        {
                            value:'28',
                            label:'MainNet'
                        },
                        {
                            value:'29',
                            label:'TestNet'
                        },
                        {
                            value:'30',
                            label:'PrivateNet'
                        }
                    ]
                },{
                    value:'21',
                    label: 'API',
                    children:[
                        {
                            value:'31',
                            label:'Develop API'
                        },
                        {
                            value:'32',
                            label:'Management API'
                        },
                        {
                            value:'33',
                            label:'Console'
                        }
                    ]
                }]
            },
            {
                value:'6',
                label:'Releases',
                children:[{
                    value:'34',
                    label:'Source code '
                },{
                    value:'35',
                    label:'Binary'
                }]
            }
        ]
    }, {
        value: '2',
        label: 'Dapp',
        children: [{
            value: '7',
            label: 'Tutorial',
        },{
            value: '8',
            label: 'SDK',
        },{
            value: '36',
            label: 'Payment',
            children:[{
                value: '37',
                label: '钱包APP',
                children:[{
                    value: '22',
                    label: 'IOS',
                },{
                    value: '23',
                    label: 'Android',
                }]
            },{
                value: '24',
                label: 'Nebpay SDK',
                children:[{
                    value: '39',
                    label: 'NebPay.js',
                },{
                    value: '40',
                    label: 'iOS SDK',
                },{
                    value: '41',
                    label: 'Android SDK',
                }]
            },{
                value: '25',
                label: 'Extension',
            }]
        },{
            value: '9',
            label: 'Claim',
        },{
            value: '10',
            label: 'IDE',
        }],
    },{
        value:'3',
        label:'Q&A',
        children:[{
            value:'11',
            label:'Node',
        },{
            value:'12',
            label:'Smart contract',
        },{
            value:'13',
            label:'SDK',
        }]
    }];

class DocsAdd extends Component {

    constructor(props){
        super(props);

        this.state = {
            displayEdit : "none",
            btnEdit : "Edit",
            markdown : "",
            docsID : "",
            docsTitle : "",
            docsTitleURL : "",
            docsCategoryID : "",
            simplemde: null,
        };

        this.handleEditMarkdown = this.handleEditMarkdown.bind(this);
        this.handleEditChange   = this.handleEditChange.bind(this);
        this.handleEditSave     = this.handleEditSave.bind(this);
        //this.handleEditMarkdownSave = this.handleEditMarkdownSave.bind(this);

        this.onTitleChange      = this.onTitleChange.bind(this);
        this.onTitleURLChange   = this.onTitleURLChange.bind(this);
        this.onCategoryChange   = this.onCategoryChange.bind(this);
    }

    componentWillMount(){


    }

    initMarkdown(){
        let simplemde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: true,
            spellChecker:false,

            previewRender: function(plainText) {
                return marked(plainText,{
                    renderer: new marked.Renderer(),
                    // gfm: true,
                    // pedantic: false,
                    // sanitize: false,
                    // tables: true,
                    // breaks: true,
                    // smartLists: true,
                    // smartypants: true,


                    highlight: function (code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
            },
        });

        this.setState({
            simplemde : simplemde
        })
    }

    componentDidMount() {
        this.initMarkdown();
    }

    handleEditMarkdown() {

        if (!this.state.simplemde){
            this.initMarkdown();
        }

        this.setState({
            displayEdit: this.state.displayEdit == 'none'? '':'none',
            btnEdit : this.state.btnEdit == 'Edit' ? 'Cancel' : 'Edit',
        });

    }

    handleEditChange(e) {
        this.setState({
            markdown:e.target.value
        })
    }

    handleEditSave(e){
        //alert(this.refs.select.value)

        let _this = this;
        _this.setState({
            markdown: this.state.simplemde.value()
        }, ()=>{
            let params = qs.stringify({'title': this.state.docsTitle, 'title_url': this.state.docsTitleURL,'content': this.state.markdown});
            console.log(params)
            axios.post('/api/docs', params).then( (response) => {
                message.success('Success!');
                _this.state.simplemde.toTextArea()

                if (response.data.code == 0) {
                    _this.setState({
                        docsTitle: "",
                        docsTitleURL: "",
                        markdown : "",
                        simplemde:null

                    },()=>{
                        _this.initMarkdown()
                    })
                }
            })
        })

    }

    onTitleChange = (e) => {
        this.setState({
            docsTitle: e.target.value
        },()=>{
            console.log(this.state.docsTitle)
        })
    }

    onTitleURLChange = (e) => {
        this.setState({
            docsTitleURL: e.target.value
        },()=>{
            console.log(this.state.docsTitleURL)
        })
    }

    onCategoryChange = (e) => {

        let category = e.pop();
        console.log("category is "+ category)
        this.setState({
            docsCategoryID: category
        })

    }


    render() {
        return (
            <div>
                <Header />

                <div className="heade-crumb">
                    <div className="heade-crumb-wrap">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/node/overview">
                                <Icon type="user" />
                                <span>Add</span>
                            </Breadcrumb.Item>

                        </Breadcrumb>
                    </div>
                </div>

                <section className="doc-wrap clear">
                    <NavBar title={this.props.match.params.title} />
                    <div className="doc-right">

                        <div className="doc-right-wrap">
                            <p className="edit">

                                <Button type="default" onClick={this.handleEditSave}>
                                    <Icon type="check-circle" />
                                    Save
                                </Button>

                            </p>

                            <div>
                                <p>Title: <Input ref="sdf" placeholder="Title" onChange={this.onTitleChange} value={this.state.docsTitle} /></p> <br />
                                <p>TitleURL: <Input placeholder="Title URL" onChange={this.onTitleURLChange} value={this.state.docsTitleURL} /></p> <br />
                                <p>Category: <br /> <Cascader ref="select" options={options} placeholder="Please select" onChange={this.onCategoryChange} style={{width:"500px"}} /> </p><br />

                                <textarea id="editor" value={this.state.markdown} />
                            </div>


                        </div>

                    </div>
                </section>

            </div>
        );
    }
}

export default DocsAdd;

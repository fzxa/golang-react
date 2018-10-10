import qs from 'querystring'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'
import {Icon, message, Button, Breadcrumb, Cascader, Input, Spin} from 'antd'

import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'
import 'react-markdown/'
import axios from 'axios'
import Instance from '../../../service/instance.service'

import Header  from '../../Common/Header/Header'
import NodeBar from '../../Common/SideBar/NodeBar'
import DappBar from '../../Common/SideBar/DappBar'
import QuestiosnBar from '../../Common/SideBar/QuestionsBar'


import "./Docs.less"

const ButtonGroup = Button.Group;

class NodeNav extends Component {
    render(){
        return(
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/node/mac-os-x">
                    <Icon type="share-alt" />
                    <span>Node</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {this.props.title}
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

class DappNav extends Component {
    render(){
        return(
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/dapp/tutorial-compare">
                    <Icon type="share-alt" />
                    <span>Dapp</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {this.props.title}
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

class QuestionsNav extends Component {
    render(){
        return(
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/questions/faq">
                    <Icon type="share-alt" />
                    <span>Questions</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {this.props.title}
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

class Docs extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            displayEdit : "none",
            btnEdit : "Edit",
            markdown : "",
            docsID : "",
            docsTitle : "",
            docsTitleURL : "",
            simplemde: null,
            navCategory:"",
            isLogin : false,
        };

        this.handleEditMarkdown = this.handleEditMarkdown.bind(this);
        this.handleEditChange   = this.handleEditChange.bind(this);
        this.handleEditSave     = this.handleEditSave.bind(this);
        //this.handleEditMarkdownSave = this.handleEditMarkdownSave.bind(this);

        this.handleAddMarkdown  = this.handleAddMarkdown.bind(this);
        this.handleGetMarkdown  = this.handleGetMarkdown.bind(this);
        this.onTitleChange      = this.onTitleChange.bind(this);
        this.onTitleURLChange   = this.onTitleURLChange.bind(this);
        this.onCategoryChange   = this.onCategoryChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.location.pathname !== this.props.match.url){
            let titleURL = nextProps.match.params.title;
            //this.initState();
            //console.log(this.state.simplemde)
            this.setState({
                "markdown": "",
                // "displayEdit":"none",

            }, ()=>{
                this.handleGetMarkdown(titleURL)
            })

        }

    }

    componentWillMount(){
        let _this = this;
        let path = this.props.match.path;
        let pathArr = path.split("/");
        path = pathArr[1];
        this.setState({
            "navCategory" : path
        })
        // if (path.indexOf('node')){}
        this.handleGetMarkdown()


        Instance.get('/api/checklogin').then( (response) => {
            let data = response.data;
            if (data.code == 0) {
                _this.setState({
                    isLogin : true
                })
            }
        }).catch((error)=>{
            message.error(error.message)
        })

    }

    initMarkdown(){
        let simplemde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autofocus: true,
            autosave: false,
            spellChecker:false,
            lineWrapping:false,
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

    initState(){
        this.setState = ({
            loading: false,
            displayEdit : "none",
            displayMarkdown : "",
            btnEdit : "Edit",
            markdown : "",
            docsID : "",
            docsTitle : "",
            docsTitleURL : "",
            simplemde: null,
            navCategory:""
        });
    }

    componentDidMount() {

    }

    handleGetMarkdown(titleURL) {
        let _this = this;
        var titleURL = titleURL || this.props.match.params.title;
        this.setState({
            "loading": true
        })

        Instance.get("/api/docs/"+titleURL).then( (response)=> {
            let content = response.data.data.content;
            let docsID = response.data.data.id;
            let docsTitle = response.data.data.title;
            let docsTitleURL = response.data.data.title_url;
            // content = content.replace(/`/g, '\\`');
            _this.setState({
                markdown: content,
                docsID: docsID,
                docsTitle : docsTitle,
                docsTitleURL: docsTitleURL,
                loading: false,
            }, ()=>{
                if(_this.state.simplemde){
                    _this.state.simplemde.value(content)
                }

            })

            //_this.initMarkdown()
        })
        .catch(function (error) {
            _this.initState()

        })


    }

    handleEditMarkdown() {

        if (!this.state.simplemde){
            this.initMarkdown();
            //this.refs.markdownHTML.hide()
        }

        this.setState({
            displayEdit: this.state.displayEdit == 'none'? '':'none',
            displayMarkdown: this.state.displayMarkdown == 'none' ? '':'none',
            btnEdit : this.state.btnEdit == 'Edit' ? 'Cancel' : 'Edit',
        }, ()=>{
            console.log(this.state.displayMarkdown)
        });

    }

    handleEditChange(e) {
        this.setState({
            markdown:e.target.value
        })
    }

    handleEditSave(e){

        let _this = this;
        _this.setState({
            markdown: this.state.simplemde.value()
        }, ()=>{
            let params = qs.stringify({'docs_id':this.state.docsID, 'docs_content': this.state.markdown,'docs_title':this.state.docsTitle, 'docs_title_url':this.state.docsTitleURL})
            Instance.put('/api/docs/'+this.state.docsID, params).then( (response) => {

                if (response.data.code == 0) {
                    message.success('Success!');
                    _this.setState({
                        displayEdit : 'none',
                        displayMarkdown: '',
                        btnEdit : 'Edit'
                    })
                } else {
                    message.error(response.data.msg);
                }
            }).catch((error)=>{
                message.error(error.message)
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

    handleAddMarkdown(){
        this.props.history.push("/add")
    }




    render() {
        let SideBar = this.state.navCategory == 'node' ? NodeBar : (this.state.navCategory == 'dapp'? DappBar : QuestiosnBar);
        let isLogin = this.state.isLogin == true ? "": "none";
        let MapNav = this.state.navCategory == 'node'? NodeNav : (this.state.navCategory == 'dapp'? DappNav : QuestionsNav);
        return (
            <div>
                <Header />

                <div className="heade-crumb">
                    <div className="heade-crumb-wrap">

                       <MapNav title={this.props.match.params.title} />

                    </div>
                </div>

                <section className="doc-wrap clear">
                    <SideBar title={this.props.match.params.title} match={this.props.match} location={this.props.location} />
                    <div className="doc-right">
                        <Spin spinning={this.state.loading} >
                            <div className="doc-right-wrap">
                                <p className="edit" style={{display:isLogin}}>
                                    <ButtonGroup>
                                        <Button type="defulat" onClick={this.handleAddMarkdown}>
                                            <Icon type="plus-square"  />
                                            Add
                                        </Button>
                                        <Button type="defulat" onClick={this.handleEditMarkdown}>
                                            <Icon type="file-markdown"  />
                                            {this.state.btnEdit}
                                        </Button>
                                        <Button type="default" onClick={this.handleEditSave}>
                                            <Icon type="check-circle" />
                                            Save
                                        </Button>
                                    </ButtonGroup>
                                </p>

                                <div style={{display:this.state.displayEdit}}>
                                    <p>Title: <Input placeholder="Title" value={this.state.docsTitle} onChange={this.onTitleChange}  /></p> <br />
                                    <p>TitleURL: <Input placeholder="Title URL" value={this.state.docsTitleURL} onChange={this.onTitleURLChange} /></p> <br />
                                    {/*<p>Category: <br /> <Cascader options={options} placeholder="Please select" /> </p><br />*/}

                                    <textarea id="editor" value={this.state.markdown} />
                                </div>

                                {/*<div id="editormd" style={{padding:'0 40px',display:this.state.displayEdit}}>*/}
                                    {/*<textarea id="append-test" onChange={this.handleEditChange} value={this.state.markdown} style={{ width:'100%', height:'400px', padding:'10px'}} />*/}
                                    {/*<Button type="default" size="large" style={{float:"right"}} onClick={this.handleEditSave}>Enter</Button>*/}
                                {/*</div>*/}
                                <div style={{display:this.state.displayMarkdown}}>
                                    <ReactMarkdown className="markdown-body " source={this.state.markdown} />
                                </div>
                            </div>
                        </Spin>
                    </div>
                </section>

            </div>
        );
    }
}

export default Docs;

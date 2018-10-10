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
import Instance from '../../service/instance.service'

import Header from '../Common/Header/Header'
import NavBar from './NavBar/NavBar'


import "./Node.less"

const ButtonGroup = Button.Group;

const options = [{
    value: '1',
    label: 'Node',
    children: [{
        value: '2',
        label: 'Installation',
        children: [{
            value: '3',
            label: 'For Mac OS X',
        }],
    }],
    children: [{
        value: 3,
        label: 'Usage',
        children:[{
            value:'',
            label: 'Build'
        }]
    }]
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class Node extends Component {

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
            console.log(this.state.simplemde)
            this.setState({
                "markdown": "",
                // "displayEdit":"none",

            }, ()=>{
                this.handleGetMarkdown(titleURL)
            })

        }

    }

    componentWillMount(){

        this.handleGetMarkdown()



        // axios.get("http:/api/docs/"+this.props.match.params.title).then( (response)=> {
        //     let content = response.data.data.content;
        //     let docsID = response.data.data.id;
        //     let docsTitle = response.data.data.title;
        //     let docsTitleURL = response.data.data.title_url;
        //     // content = content.replace(/`/g, '\\`');
        //     _this.setState({
        //         markdown: content,
        //         docsID: docsID,
        //         docsTitle : docsTitle,
        //         docsTitleURL: docsTitleURL
        //     }, ()=>{
        //         //console.log(_this.state.markdown)
        //     })
        //
        //     //_this.initMarkdown()
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })



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
        // alert(this.state.markdown);
        // alert(this.state.docsID);
        // alert(this.state.docsTitle);
        // alert(this.state.docsTitleURL);//
        let _this = this;
        _this.setState({
            markdown: this.state.simplemde.value()
        }, ()=>{
            let params = qs.stringify({'docs_id':this.state.docsID, 'docs_content': this.state.markdown,'docs_title':this.state.docsTitle, 'docs_title_url':this.state.docsTitleURL})
            Instance.put('/api/docs/'+this.state.docsID, params).then( (response) => {
                message.success('Success!');
                if (response.data.code == 0) {
                    _this.setState({
                        displayEdit : 'none',
                        displayMarkdown: '',
                        btnEdit : 'Edit'
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

    handleAddMarkdown(){
        this.props.history.push("/add")
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
                            <Breadcrumb.Item href="/node/mac-os-x">
                                <Icon type="share-alt" />
                                <span>Node</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {this.state.docsTitle}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <section className="doc-wrap clear">
                    <NavBar title={this.props.match.params.title} match={this.props.match} location={this.props.location} />
                    <div className="doc-right">
                        <Spin spinning={this.state.loading} >
                            <div className="doc-right-wrap">
                                <p className="edit">
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

export default Node;

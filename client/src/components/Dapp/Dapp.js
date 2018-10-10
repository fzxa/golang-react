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
import Instance from '../../service/instance.service'

import Header from '../Common/Header/Header'
import NavBar from './NavBar/NavBar'


import "./Dapp.css"

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

class Dapp extends Component {

    constructor(props){
        super(props);

        this.state = {
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
        this.onTitleChange      = this.onTitleChange.bind(this);
        this.onTitleURLChange   = this.onTitleURLChange.bind(this);
        this.onCategoryChange   = this.onCategoryChange.bind(this);
    }

    componentWillMount(){
        console.log('title_url is ' +this.props.match.params.title);
        let _this = this;

        Instance.get("/api/docs/"+this.props.match.params.title).then( (response)=> {
            let content = response.data.data.content;
            let docsID = response.data.data.id;
            let docsTitle = response.data.data.title;
            let docsTitleURL = response.data.data.title_url;
            // content = content.replace(/`/g, '\\`');
            _this.setState({
                markdown: content,
                docsID: docsID,
                docsTitle : docsTitle,
                docsTitleURL: docsTitleURL
            }, ()=>{
                //console.log(_this.state.markdown)
            })

            //_this.initMarkdown()
        })
            .catch(function (error) {
                console.log(error);
            })

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
                            <Breadcrumb.Item href="/node/overview">
                                <Icon type="user" />
                                <span>Node</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {this.state.docsTitle}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <section className="doc-wrap clear">
                    <NavBar title={this.props.match.params.title} />
                    <div className="doc-right">

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
                            <div ref="marktohtml">
                                <ReactMarkdown className="markdown-body " source={this.state.markdown} style={{display:'none'}} />
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        );
    }
}

export default Dapp;

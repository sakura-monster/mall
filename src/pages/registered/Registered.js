import React from "react";
import Title from "../../components/title/Title";
import './registered.css'
import {register} from "../../util/request";
import { Toast} from 'antd-mobile';

export default class Registered extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      info:{
        phone:'',
        nickname:null,
        password:null
      }
    }
  }
  login(){
      register(this.state.info).then(res=>{
        if(res.data.code === 200){
          Toast.success(res.data.msg, 2);
          this.props.history.push('/login')
        }else {
          Toast.fail(res.data.msg, 2);
        }
      });
  }
  focus(e){
    e.target.tagName === 'DIV' && e.target.children[0].focus()
  }
  goBack(){
    this.props.history.goBack()
  }
  changeInfo(key,e){
    this.setState({
      ...this.state,
      info:{
        ...this.state.info,
        [key]:e.target.value
      }
    });
  }
  render() {
    return (
      <div className='registered'>
        <Title isShow title='登录'/>
        <div className="registered-box">
          <div onClick={this.focus.bind(this)}>手机号：<input type="Number" onChange={this.changeInfo.bind(this,'phone')}/></div>
          <div onClick={this.focus.bind(this)}>昵称：<input type="text" onChange={this.changeInfo.bind(this,'nickname')}/></div>
          <div onClick={this.focus.bind(this)}>密码：<input type="password" onChange={this.changeInfo.bind(this,'password')}/></div>
          <p onClick={this.goBack.bind(this)}>已有账号去登陆</p>
          <button onClick={this.login.bind(this)}>注册</button>
        </div>
      </div>
    );
  }
}
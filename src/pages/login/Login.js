import React from "react";
import './login.css'
import Title from "../../components/title/Title";
import {connect} from "react-redux";
import {userInfo,requestUserInfo} from "../../store/store";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      info:{
        phone:'',
        password:''
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.userInfo && this.props.history.push('/index/home')
  }

  login(){
    this.props.requestUserInfo(this.state.info)

  }
  focus(e){
    e.target.tagName === 'DIV' && e.target.children[0].focus()
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
      <div className="login">
        <Title title='登录' right={true}/>
        <div className="login-box">
          <div onClick={this.focus.bind(this)}>账号：<input onChange={this.changeInfo.bind(this,'phone')} type="Number"/></div>
          <div onClick={this.focus.bind(this)}>密码：<input onChange={this.changeInfo.bind(this,'password')} type="password"/></div>
          <p>忘记密码</p>
          <button onClick={this.login.bind(this)}>登录</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo:userInfo(state)
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
    requestUserInfo: (data)=>dispatch(requestUserInfo(data))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login)
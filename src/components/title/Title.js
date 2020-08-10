import React from "react";
import './title.css';
import {withRouter} from "react-router-dom"
function Title(props) {
 const goBack = ()=>{
   props.history.goBack()
 };
 const registered = ()=>{
   props.history.push('/registered')
 };
  return (
    <div className='back'>
      {props.isShow?<div className="left" onClick={goBack.bind(this)}>返回</div>:null}
      {props.title}
      {props.right?<div className="right" onClick={registered.bind(this)}>注册</div>:null}
    </div>
  )
}

export default withRouter(Title)
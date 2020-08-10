import React from "react";
import {Route,Redirect} from 'react-router-dom'
import './myRoute.css'
export default class MyRoute extends React.Component{
  render() {
    const isLogin = sessionStorage.getItem('user');
    return (
      <div className='myRoute'>
        {isLogin?<Route {...this.props}/>:<Redirect to='/login'/>}
      </div>
    )
  }
}
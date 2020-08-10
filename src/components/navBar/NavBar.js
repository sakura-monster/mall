import React from "react";
import './navBar.css'
import logo from '../../asset/img/img/home/logo.jpg'
export default class NavBar extends React.Component{
  render() {
    return (
      <div className='navBar'>
        <img src={logo} alt=""/>
        <input type="text" placeholder='寻找商品'/>
      </div>
    );
  }

}
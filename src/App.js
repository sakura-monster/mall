import React from 'react';
import './App.css';
import {Switch,Redirect,Route} from 'react-router-dom'
import lazyComponent from "./util/lazyComponent";
import MyRoute from "./components/myRoute/MyRoute";
import 'antd-mobile/dist/antd-mobile.css'
import {Toast} from "antd-mobile";

const Login = lazyComponent(()=>import('./pages/login/Login'));
const Index = lazyComponent(()=>import('./pages/index/Index'));
const GoodsList = lazyComponent(()=>import('./pages/goodsList/GoodsList'));
const GoodsDetail = lazyComponent(()=>import('./pages/goodsDetail/GoodsDetail'));
const Registered = lazyComponent(()=>import('./pages/registered/Registered'));
export default class App extends React.Component{
  componentDidMount() {
    document.addEventListener('click',()=>{
      Toast.hide()
    },true)
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={Login}/>
          <MyRoute path='/index' component={Index}/>
          <MyRoute path='/goodslist' component={GoodsList}/>
          <MyRoute path='/goodsdetail' component={GoodsDetail}/>
          <MyRoute path='/registered' component={Registered}/>
          <Redirect to='/login'/>
        </Switch>
      </div>
    );
  }
}


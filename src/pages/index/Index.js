import React from "react";
import {Switch,Redirect,Route} from 'react-router-dom'
import './index.css'
import Mine from "../mine/Mine";
import Home from "../home/Home";
import Classify from "../classify/Classify";
import Cart from "../cart/Cart";
import TabBar from "../../components/tabBar/TabBar";
export default class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:''
    }
  }
  render() {
    return (
      <div className='index'>
        <Switch>
          <Route path='/index/home' component={Home}/>
          <Route path='/index/classify' component={Classify}/>
          <Route path='/index/cart' component={Cart}/>
          <Route path='/index/mine' component={Mine}/>
          <Redirect to='/index/home'/>
        </Switch>
        {this.props.location?<TabBar/>:null}
      </div>
    )
  }
}
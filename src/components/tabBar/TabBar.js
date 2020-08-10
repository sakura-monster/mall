import React from "react";
import './tabBar.css'
import {withRouter} from 'react-router-dom'
import home1 from '../../asset/img/tab_home_nor.png'
import home2 from '../../asset/img/tab_home_hig.png'
import classify1 from '../../asset/img/tab_menu_nor.png'
import classify2 from '../../asset/img/tab_menu_hig.png'
import cart1 from '../../asset/img/tab_shopping_nor.png'
import cart2 from '../../asset/img/tab_shopping_hig.png'
import mine1 from '../../asset/img/tab_me_nor.png'
import mine2 from '../../asset/img/tab_me_hig.png'

class TabBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url : ''
    }
  }
  jump(url){
    this.setState({
      url
    });
    this.props.history.push(url)
  }
  render() {
    const pathName = this.props.location.pathname;
    return (
      <div className='tabBar'>
        <div className={pathName === '/index/home'?'active':null}
             onClick={this.jump.bind(this,'/index/home')}>
          <img src={pathName === '/index/home'?home2:home1} alt=""/>
          <span>首页</span>
        </div>
        <div className={pathName === '/index/classify'?'active':null}
             onClick={this.jump.bind(this,'/index/classify')}>
          <img src={pathName === '/index/classify'?classify2:classify1} alt=""/>
          <span>分类</span>
        </div>
        <div className={pathName === '/index/cart'?'active':null}
             onClick={this.jump.bind(this,'/index/cart')}>
          <img src={pathName === '/index/cart'?cart2:cart1} alt=""/>
          <span>购物车</span>
        </div>
        <div className={pathName === '/index/mine'?'active':null}
             onClick={this.jump.bind(this,'/index/mine')}>
          <img src={pathName === '/index/mine'?mine2:mine1} alt=""/>
          <span>我的</span>
        </div>
      </div>
    );
  }
}

export default withRouter(TabBar)
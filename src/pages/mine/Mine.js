import React from "react";
import "./mine.css"
import {connect} from "react-redux";
import {userInfo} from "../../store/store";
import avatar from '../../asset/img/1.jpg';

class Mine extends React.Component{
  componentDidMount() {
    console.log(this.props.userInfo);
  }

  render() {
    return (
      <div className='indexView mine'>
        <div className="top">
          <div className="orange">
            <i className=' icon-cog'/>
            个人中心
            <i className='icon-bubbles2'/>
          </div>
          <img className='avatar' src={avatar} alt=""/>
          <p>方脑壳</p>
          <div className='cc '> <i className='icon-heart'/> 我的收藏（5）</div>
        </div>
        <div className="bottom">
          <div className="top">
            <div>我的订单</div>
            <div>查看订单</div>
          </div>
          <div className="center">
            <div><i className='icon-truck'/> 待发货</div>
            <div><i className='icon-box-add'/>待收货</div>
            <div><i className='icon-display'/> 电脑</div>
            <div><i className='icon-tablet'/> 手机</div>
            <div><i className='icon-qrcode'/> 二维码</div>
          </div>
        </div>
        <div className="sh">收货地址管理</div>

      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo: userInfo(state)
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {

  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Mine)
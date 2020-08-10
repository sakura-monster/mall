import React from "react";
import './home.css'
import NavBar from "../../components/navBar/NavBar";
import Swipe from "./components/swipe/Swipe";
import {homeList,requestHomeList, requestSwipeList, swipeList} from "../../store/store";
import {connect} from "react-redux"
import {filterPrice} from "../../util/filter";
import a from '../../asset/img/a.png'
import b from '../../asset/img/b.png'
import c from '../../asset/img/c.png'
import d from '../../asset/img/d.png'
class Home extends React.Component{

  componentDidMount() {
    this.props.requestSwipeList();
    this.props.requestHomeList();

  }
  goDetail(id,title){
    this.props.history.push('/goodsdetail/?id=' + id + '&title=' + title)
  }

  render() {
    const {swipeList} = this.props;
    return (
      <div className='home indexView'>
        <NavBar/>
        <div className="home-content">
          <Swipe swipeList={swipeList}/>
          <div className="swiper-slide">
            <div>
              <img src={a} alt=""/>
              新品首发
            </div>
            <div>
              <img src={b} alt=""/>
              运动旅行
            </div>
            <div>
              <img src={c} alt=""/>
              服饰鞋包
            </div>
            <div>
              <img src={d} alt=""/>
              个护清洁
            </div>
          </div>
          <ul>
            {
              this.props.homeList.content&& this.props.homeList.content.length>0?this.props.homeList.content.map(item=>{
                return <li key={item.id} onClick={this.goDetail.bind(this,item.id,item.goodsname)}>
                  <img src={this.$url + item.img} alt=""/>
                  <div className="right">
                    <p className="title">{item.goodsname}</p>
                    <p className="price">￥{filterPrice(item.price)}</p>
                    <span>立即抢购</span>
                  </div>
                </li>
              }):null
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    swipeList:swipeList(state),
    homeList: homeList(state)
  }
};
const  mapDispatchToProps = (dispatch)=>{
  return {
    requestSwipeList: ()=> dispatch(requestSwipeList()),
    requestHomeList: ()=> dispatch(requestHomeList())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home)
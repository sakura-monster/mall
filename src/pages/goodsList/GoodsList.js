import React from "react";
import {connect} from "react-redux";
import {classifyGoods,requestClassifyGoods} from "../../store/store";
import Title from "../../components/title/Title";
import './goodsList.css'
import querystring from 'querystring'
import {filterPrice} from "../../util/filter";

class GoodsList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      baseInfo:{}
    };
  }
  componentWillMount() {
    this.setState({
      baseInfo:querystring.parse(this.props.history.location.search.slice(1))
    });
  }

  componentDidMount() {
    const fid = this.state.baseInfo.fid;
    this.props.requestClassifyGoods({fid})
  }

  goDetail(id,title){
    this.props.history.push('/goodsdetail/?id=' + id + '&title=' + title)
  }

  render() {
    return (
      <div className='goodsList'>
        <Title isShow={true} title={this.state.baseInfo.title}/>
        <div className="goodsList-content">
          <ul>
            {
              this.props.classifyGoods.length>0?this.props.classifyGoods.map(item=>{
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
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    classifyGoods: classifyGoods(state)
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
    requestClassifyGoods: (fid)=>dispatch(requestClassifyGoods(fid))
  }
};



export default connect(mapStateToProps,mapDispatchToProps)(GoodsList)
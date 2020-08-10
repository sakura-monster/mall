import React from "react";
import './goodsDetail.css'
import {connect} from "react-redux";
import {requestGoodsDetail, goodsDetail, userInfo, requestCartListAdd, cartList, isAdd,changeIsAdd} from "../../store/store";
import Title from "../../components/title/Title";
import querystring from 'querystring';
import { List, Stepper} from 'antd-mobile';

class GoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseInfo: {},
      isShow:false,
      chooseIndex:0,
      val: 1,
    }
  }

  componentWillMount() {
    this.setState({
      baseInfo: querystring.parse(this.props.history.location.search.slice(1))
    })
  }

  componentDidMount() {
    this.props.requestGoodsDetail({id: this.state.baseInfo.id});
  }

  addInfo(e){
    if(e.target.className === 'right'||e.target.className === 'addInfo'){
      this.props.changeIsAdd();
    }
  }

  chooseNum(index){
    this.setState({
      chooseIndex : index
    })
  }
  addCart(){
    const data = {
      uid:this.props.userInfo.uid,
      goodsid:this.props.goodsDetail[0].id,
      num: this.state.val
    };
    this.props.requestCartListAdd(data)
  }
  onChange = (val) => {
    this.setState({ val });
    console.log(this.state.val);

  };

  render() {
    const item = this.props.goodsDetail;
    return (
      <div className='goodsDetail'>
        <Title isShow={true} title={this.state.baseInfo.title}/>
        <div className="goodsDetail-info">
          {
            item?item.map(item=>{
              return <div key={item.id}>
                <img src={item.img} alt="" className='img'/>
                <div className="goodsInfo">
                  <p className='title'>{item.goodsname}</p>
                  <div className='size'>{item.specsname}：
                    {
                      JSON.parse(item.specsattr).map(i=>{
                        return <span key={i}>{i}</span>
                      })
                    }
                  </div>
                  <div>价格：
                    <span className='price'>￥{item.price}</span>
                    <span className='oldPrice'>￥{item.market_price}</span>
                  </div>

                  <div className='tag'>
                    {item.ishot===1?<span>热卖</span>:null}
                    {item.isnew===1?<span>新品</span>:null}
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{__html:item?item.description:null}}/>
              </div>
            }):null
          }


        </div>
        <div className="addCart">
          <div className="right" onClick={this.addInfo.bind(this)}>加入购物车</div>
        </div>
        {
          this.props.isAdd?
            ( <div className="addInfo"
                   onClick={this.addInfo.bind(this)}>
                <div className='white'>
                  <p className='title'>{item[0].goodsname}</p>
                  <img src={this.$url + item[0].img} alt=""/>
                  <p className='sizeTitle'>{item[0].specsname}规格：</p>
                  <div className='chooseSize'>
                    {
                      JSON.parse(item[0].specsattr).map((item,index)=>{
                        return <span key={item}
                                     className={index===this.state.chooseIndex?'active':null}
                                     onClick={this.chooseNum.bind(this,index)}>{item}</span>
                      })
                    }
                  </div>
                  <div className="num">
                    <List>
                      <List.Item
                        wrap
                        extra={
                          <Stepper
                            style={{ width: '100%', minWidth: '100px' }}
                            showNumber
                            max={10}
                            min={1}
                            value={this.state.val}
                            onChange={this.onChange}
                          />}
                      >
                        添加数量
                      </List.Item>
                    </List>
                  </div>
                  <div className="btn"  onClick={this.addCart.bind(this)}>加入购物车</div>
                </div>
              </div>):null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: userInfo(state),
    goodsDetail: goodsDetail(state),
    cartList: cartList(state),
    isAdd: isAdd(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestGoodsDetail: (id) => dispatch(requestGoodsDetail(id)),
    requestCartListAdd: (data) => dispatch(requestCartListAdd(data)),
    changeIsAdd: ()=> dispatch(changeIsAdd())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetail)
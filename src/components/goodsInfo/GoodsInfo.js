import React from "react";
import store from "../../asset/img/store.png";
import chooseImg from "../../asset/img/radio_nor.png";
import chooseImg1 from '../../asset/img/radio_hig.png'
import { Modal , Toast } from 'antd-mobile';
import {filterPrice} from "../../util/filter";
import {connect} from "react-redux";
import {
  requestEditCartList,
  cartList,
  changeCartList,
  changeChooseAll,
  requestDelCart,
  userInfo
} from "../../store/store";

const alert = Modal.alert;

class GoodsInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      val:1,
      disable:false,
      info:null
    }
  }

  addNum(i){
    this.props.requestEditCartList({id:this.props.info.id,type:i})
  }
  changeNum(e,index){

  }
  choose(index){
    const arr = JSON.parse(JSON.stringify(this.props.cartList));
    arr[index].checked = !arr[index].checked;
    const aa = arr.some(item=>{
      return item.checked === false
    });
    aa?this.props.changeChooseAll(false):this.props.changeChooseAll(true);

    this.props.changeCartList(arr);
  }

  delGoods(id){
    alert('Delete', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: 'Ok',
        onPress: () =>
          new Promise((resolve) => {
            this.props.requestDelCart({id},{uid:this.props.userInfo.uid})
            setTimeout(resolve, 1);
          }),
      },
    ]);
  }
  render() {
    const {info,index} = this.props;
    return (
      <div>
        <div className="title">
          <img src={store} alt=""/>杭州保税区仓
        </div>
        <div className={this.props.edit?'outer actionDel':'outer'} >
          <div className="content">
            <img src={info.checked?chooseImg1:chooseImg} onClick={this.choose.bind(this,index)} alt=""/>
            <img src={this.$url + info.img} alt=""/>
            <div>
              <p className='name'>{info.goodsname}</p>
              <div className='edit'>
                <button onClick={this.addNum.bind(this,1)}>-</button>
                <input type="text" onChange={this.changeNum.bind(this,index)} value={info.num}/>
                <button onClick={this.addNum.bind(this,2)}>+</button>
              </div>
              <p className='price'>￥{filterPrice(info.price*info.num)}</p>
            </div>
            <div className="price1">￥{filterPrice(info.price)}</div>
          </div>
          <div className='del' onClick={this.delGoods.bind(this,info.id)}>删除</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    cartList: cartList(state),
    userInfo: userInfo(state)
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
    requestEditCartList :(data)=>dispatch(requestEditCartList(data)),
    changeCartList: (data)=>dispatch(changeCartList(data)),
    changeChooseAll: (bol)=> dispatch(changeChooseAll(bol)),
    requestDelCart: (id,uid)=>dispatch(requestDelCart(id,uid))
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(GoodsInfo)
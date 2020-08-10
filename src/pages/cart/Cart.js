import React from "react";
import {connect} from "react-redux";
import {cartList,userInfo,requestGetCartList,changeCartList,chooseAll,changeChooseAll} from "../../store/store";
import {filterPrice} from "../../util/filter";
import Title from "../../components/title/Title";
import './cart.css';
import GoodsInfo from "../../components/goodsInfo/GoodsInfo";
import cartImg from '../../asset/img/tab_shopping_nor.png'
import editImg from '../../asset/img/editor_hig.png'
import editImg2 from '../../asset/img/editor_nor.png'
import chooseImg from '../../asset/img/radio_nor.png'
import chooseImg1 from '../../asset/img/radio_hig.png'
import store from '../../asset/img/store.png'
class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      val:1,
      disable:false,
      edit:false
    }
  }
  componentDidMount() {
    this.props.requestGetCartList({uid:this.props.userInfo.uid})
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  chooseAll(){
    const arr = JSON.parse(JSON.stringify(this.props.cartList));
    arr.forEach((item,index)=>{
      arr[index].checked = !this.props.chooseAll;
    });
    this.props.changeChooseAll(!this.props.chooseAll);
    this.props.changeCartList(arr);
  }
  edit(){
    this.setState({
      ...this.state,
      edit: !this.state.edit
    })
  }
  render() {
    let totalPrice = 0;
    this.props.cartList && this.props.cartList.forEach(item=>{
      if(item.checked)totalPrice += item.num*item.price
    });

    return (
      <div className='indexView cart'>
        <Title title='购物车'/>
        {this.props.cartList&&this.props.cartList.length>0?(<div className="goodsList">
              <div className='aa'>
                <div className='top'>

                  {
                    this.props.cartList.length>0?(
                      this.props.cartList.map((item,index)=>{
                        return <GoodsInfo
                          key={item.id}
                          index={index}
                          info={item} edit={this.state.edit}/>
                      })

                      ):null
                  }

                </div>
                <div className='bottom'>
                  <div className="left" onClick={this.chooseAll.bind(this)}>
                    <img src={this.props.chooseAll?chooseImg1:chooseImg} alt=""/>
                    <p>全选</p>
                  </div>
                  <div className="center">
                    <div className="left" onClick={this.edit.bind(this)}>
                      <img src={this.state.edit?editImg:editImg2} alt=""/>
                      <p>编辑</p>
                    </div>
                    <div className="right">
                      <p>合计：￥{filterPrice(totalPrice)}</p>
                      <p style={{color:'gray',marginTop:'.1rem'}}>(不含运费)</p>
                    </div>
                  </div>
                  <div className="right">去结算</div>
                </div>
              </div>
        </div>):
        (<div className='goodsNone'>
          <img src={cartImg} alt=""/><br/>购物车还是空的<br/>快去逛逛吧~</div>)}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    cartList: cartList(state),
    userInfo: userInfo(state),
    chooseAll: chooseAll(state)
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
    requestGetCartList: (uid)=>{dispatch(requestGetCartList(uid))},
    changeCartList: (data)=>dispatch(changeCartList(data)),
    changeChooseAll: (bol)=> dispatch(changeChooseAll(bol))
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
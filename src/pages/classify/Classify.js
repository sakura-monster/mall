import React from "react";
import './classify.css';
import Title from "../../components/title/Title";
import {connect} from 'react-redux';
import {classifyList,requestClassifyList,classifyTree,requestClassifyTree,activeNum,clearClassifyGoods,changeActiveNum} from "../../store/store";
import axios from 'axios'
class Classify extends React.Component{
  constructor(props){
    super(props);

  }
  classifyShow(index){
    this.props.changeActiveNum(index);
  }
  goodsList(fid,title){
    this.props.clearClassifyGoods();
    this.props.history.push('/goodslist?fid='+ fid +'&title=' + title);
  }
  componentDidMount() {
    this.props.requestClassifyList();
    this.props.requestClassifyTree();
    // axios({
    //   url:'/api/getindexgoods'
    // })
    // axios({
    //   url:'/api/getgoodsinfo',
    //   params:{id:15}
    // })
  }

  render() {
    const {classifyList,classifyTree,activeNum} = this.props;
    return (
      <div className='classifyOuter indexView'>
        <Title isShow={false} title='分类'/>
        <div className='classify'>
        <div className="left">
          <ul>
            {
              classifyList.map((item,index)=>{
                return <li key={item.id}
                           className={activeNum === index?'active':''}
                           onClick={this.classifyShow.bind(this,index)}>{item.catename}</li>
              })
            }
          </ul>
        </div>
        <div className="right">
          <ul>
            {
              classifyTree.length>0?classifyTree[activeNum].children.map(item=>{
                return (
                  <li key={item.id}
                      onClick={this.goodsList.bind(this,item.id,item.catename)}>
                    <img src={this.$url + item.img} alt=""/>
                    <div className='title'>{item.catename}</div>
                  </li>
                )
              }):null
            }
          </ul>
        </div>
      </div>
      </div>
    )
  }
}


const mapStateToProps = (state)=>{
  return {
    classifyList: classifyList(state),
    classifyTree: classifyTree(state),
    activeNum: activeNum(state)
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
    requestClassifyList:()=> dispatch(requestClassifyList()),
    requestClassifyTree:()=> dispatch(requestClassifyTree()),
    clearClassifyGoods:()=>dispatch(clearClassifyGoods()),
    changeActiveNum:(index)=>dispatch(changeActiveNum(index))
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Classify)
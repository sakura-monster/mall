import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {getHomeList,DelCartList,EditCartList,getSwipe,getClassify,getClassifyTree,getClassifyGoods,getGoodsDetail,addCartList,getCartList,login} from "../util/request";
import { Toast} from 'antd-mobile';

const stateInit = {
  homeList:[],
  swipeList:[],
  classifyList:[],
  classifyTree:[],
  activeNum:0,
  classifyGoods:[],
  goodsDetail:[],
  cartList:[],
  isAdd:false,
  chooseAll:false,
  userInfo:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):null
};



function reducer(state = stateInit,action){
  switch (action.type) {
    case 'homeList':
      return {
        ...state,
        homeList: action.payload
      };
    case 'getSwipeList':
      return {
        ...state,
        swipeList:action.payload
      };
    case 'getClassifyList':
      return {
        ...state,
        classifyList: action.payload
      };
    case 'classifyTree':
      return {
        ...state,
        classifyTree: action.payload
      };
    case 'activeNum':
      return {
        ...state,
        activeNum:action.payload
      };
    case 'ClassifyGoods':
      return {
        ...state,
        classifyGoods: action.payload
      };
    case 'goodsDetail':
      return {
        ...state,
        goodsDetail: action.payload
      };
    case 'cartList':
      return {
        ...state,
        cartList: action.payload
      };
    case 'userInfo':
      return {
        ...state,
        userInfo: action.payload
      };
    case'chooseAll':
      return {
        ...state,
        chooseAll: action.payload
      };
    case 'isAdd':
      return {
        ...state,
        isAdd: !state.isAdd
      };
    default:
      return state
  }
}

const getHomeList11 = (payload)=>{
  return {
    type: 'homeList',
    payload: payload
  }
};

export const requestHomeList = ()=>{
  return (dispatch,getState)=>{
    if(getState().homeList.length === 0){
      getHomeList().then(res=>{
        if(res.data.code === 200){
          dispatch(getHomeList11(res.data.list[0]))
        }
      })
    }
  }
};


const getSwipeList = (payload)=>{
  return {
    type:'getSwipeList',
    payload:payload
  }
};

export const requestSwipeList = ()=>{
  return (dispatch,getState)=>{
    if(getState().swipeList.length === 0){
      getSwipe().then(res=>{
        if(res.data.code === 200){
          dispatch(getSwipeList(res.data.list))
        }
      })
    }
  }
};

const getClassifyList = (payload)=>{
  return {
    type:'getClassifyList',
    payload:payload
  }
};

export const requestClassifyList = ()=>{
  return (dispatch,getState)=>{
    if(getState().classifyList.length === 0){
      getClassify().then(res=>{
        if(res.data.code === 200){
          dispatch(getClassifyList(res.data.list))
        }
      })
    }
  }
};

const getClassifyTreeList = (payload)=>{
  return {
    type:'classifyTree',
    payload:payload
  }
};

export const requestClassifyTree = ()=>{
  return (dispatch,getState)=>{
    if(getState().classifyTree.length === 0){
      getClassifyTree().then(res=>{
        if(res.data.code === 200){
          dispatch(getClassifyTreeList(res.data.list))
        }
      })
    }
  }
};

export const changeActiveNum = (payload)=>{
  return {
    type:'activeNum',
    payload:payload
  }
};


const getClassifyGoodsList = (payload)=>{
  return {
    type:'ClassifyGoods',
    payload:payload
  }
};
export const clearClassifyGoods = ()=>{
  return (dispatch)=>{
    dispatch(getClassifyGoodsList([]))
  }
};
export const requestClassifyGoods = (fid)=>{
  return (dispatch)=>{
    getClassifyGoods(fid).then(res=>{
      if(res.data.code === 200){
        dispatch(getClassifyGoodsList(res.data.list))
      }
    })
  }
};

const getGoodsDetailInfo = (payload)=>{
  return {
    type:'goodsDetail',
    payload:payload
  }
};

export const requestGoodsDetail = (id)=>{
  return (dispatch)=>{
    getGoodsDetail(id).then(res=>{
      if(res.data.code === 200){
        dispatch(getGoodsDetailInfo(res.data.list))
      }
    })
  }
};

const changeUserInfo = (payload)=>{
  return {
    type:'userInfo',
    payload:payload
  }
};

export const requestUserInfo = (data)=>{
  return (dispatch)=>{
    login(data).then(res=>{
      if(res.data.code === 200){

        sessionStorage.setItem('user',JSON.stringify(res.data.list));
        dispatch(changeUserInfo(res.data.list));
        Toast.success(res.data.msg, 1.5 );
      }else {
        Toast.fail(res.data.msg, 1.5 )
      }
    })
  }
};

export const changeCartList = (payload)=>{
  return {
    type:'cartList',
    payload:payload
  }
};

export const changeIsAdd = (payload)=>{
  console.log(payload);
  return {
    type:'isAdd',
    payload: payload
  }
};


export const requestCartListAdd = (data)=>{
  return (dispatch)=>{
    addCartList(data).then(res=>{
      if(res.data.code === 200){
        Toast.success(res.data.msg, 2);
        dispatch(changeIsAdd());
        dispatch(requestGetCartList({uid:data.uid}))
      }else {
        Toast.fail(res.data.msg, 2);
      }
    })
  }
};

export const requestGetCartList = (uid)=>{
  return (dispatch)=>{
    getCartList(uid).then(res=>{
      if(res.data.code === 200){
        const arr = res.data.list;
        arr && arr.forEach((item,index)=>{
          arr[index].checked = false
        });
        dispatch(changeCartList(arr))
      }
    })
  }
};

export const requestEditCartList = (data)=>{
  return (dispatch,getState)=>{
    EditCartList(data).then(res=>{
      if(res.data.code === 200){
        dispatch(requestGetCartList({uid:getState().userInfo.uid}))
      }
    })
  }
};

export const requestDelCart = (id,uid)=>{
  return (dispatch)=>{
    DelCartList(id).then(res=>{
      if(res.data.code === 200){
        Toast.success(res.data.msg, 1 );
        dispatch(changeChooseAll(false));
        dispatch(requestGetCartList(uid))
      }
    })
  }
};

export const changeChooseAll = (payload)=>{
  return {
    type:'chooseAll',
    payload:payload
  }
};

export const homeList = (state)=> state.homeList;
export const swipeList = (state)=> state.swipeList;
export const classifyList = (state)=> state.classifyList;
export const classifyTree = (state)=> state.classifyTree;
export const activeNum = (state)=> state.activeNum;
export const classifyGoods = (state)=> state.classifyGoods;
export const goodsDetail = (state) => state.goodsDetail;
export const cartList = (state) => state.cartList;
export const userInfo = (state) => state.userInfo;
export const isAdd = (state) => state.isAdd;
export const chooseAll = (state) => state.chooseAll;
const store = createStore(reducer,applyMiddleware(thunk));
export default store


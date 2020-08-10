import axios from 'axios'
import qs from 'qs'
axios.interceptors.response.use(res=>{
  console.group(res.config.url);
  console.log(res);
  console.groupEnd();
  return res
});

export const getSwipe = ()=>{
  return axios({
    url:'/api/getbanner',
    method:'get',
  })
};

export const  getClassify = ()=>{
  return axios({
    url:'/api/getcate'
  })
};

export const  getClassifyTree = ()=>{
  return axios({
    url:'/api/getcatetree'
  })
};

export const  getClassifyGoods = (params)=>{
  return axios({
    url:'/api/getgoods',
    params
  })
};

export const getGoodsDetail = (params)=>{
  return axios({
    url:'/api/getgoodsinfo',
    params
  })
};
export const addCartList = (data)=>{
  return axios({
    url:'/api/cartadd',
    method:'post',
    data: qs.stringify(data)
  })
};

export const getCartList = (params)=>{
  return axios({
    url:'/api/cartlist',
    params
  })
};

 export const DelCartList = (data)=>{
   return axios({
     url:'/api/cartdelete',
     method:'post',
     data:qs.stringify(data)
   })
 };

 export const EditCartList = (data)=>{
  return axios({
    url:'/api/cartedit',
    method:'post',
    data:qs.stringify(data)
  })
};

 export const register = (data)=>{
   return axios({
     url:'/api/register',
     method:'post',
     data:qs.stringify(data)
   })
 };

 export const login = (data)=>{
   return axios({
     url:'/api/login',
     method:'post',
     data:qs.stringify(data)
   })
 };

 export const getHomeList = ()=>{
   return axios({
     url:'/api/getindexgoods'
   })
 };



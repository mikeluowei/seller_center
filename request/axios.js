import axios from 'axios'
import Qs from 'qs'
import router from '../../src/router'
import md5 from 'js-md5'

import {Message} from 'element-ui';


import {uncompileStr} from '../../src/assets/js/strdense'

// 发起普通请求，不验证token
let baseRequest = axios.create({});

// 带token的请求，可能导致跨域
let authRequest = axios.create({});

// authRequest请求拦截器
authRequest.interceptors.request.use(
    config => {
      // 判断如果没有token，就跳转登录页
      if(!localStorage.getItem("token")){
        // 退出成功
        localStorage.setItem("exit", '1');

        router.replace({
            path: '/login'
        });
      }
      return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// authRequest响应拦截器
authRequest.interceptors.response.use(
    function (response) {
        return responseReturn(response)
    },
    error => {
        return Promise.reject(error);
    }
);


// baseRequest响应拦截器
baseRequest.interceptors.response.use(
    function (response){
        return responseReturn(response)
    },
    error => {
        return Promise.reject(error);
    }
);

// 处理返回
function responseReturn(response) {
    let res = response.data;
    if (res.code == '0') {
        return res;
    }
    else if (res.code == '105'){
      // 未登录也要删除掉以往token
      localStorage.removeItem('token');

      // 退出成功
      localStorage.setItem("exit", '1');

      // 如果是105就说明是未登录，跳转登录页
      router.replace({
          path: '/login'
      });
      return res;
    }
    else if(res.code == '104'){

      // 如果是104就说明是token失效
      localStorage.removeItem('token');

      // 退出成功
      localStorage.setItem("exit", '1');

      // 跳转登录页
      router.replace({
          path: '/login'
      });

       return res;
    }
    else if(res.code == '106'){
      return res;
    }
    else {
        return res;
    }
}

// 请求函数
export function sendHttp(obj) {
    let {url, method = 'get', data = null, auth = true, stringify = true} = obj;

	// 时间撮
	let timestamp = (new Date()).getTime();

	let app_secret = "cb933537f8191c33fccc29ffa4433eed";
  let uuidToken = localStorage.getItem("token");
	let token = uncompileStr(uuidToken);

	// 携带默认参数
	data.app_id = "867520190510168";
	data.timestamp = timestamp;
	data.from = "seller";

	if(token){
		data.token = token;
	}
	else{
		data.token = '';
	}

	let arr = [];
	let sign = "";

	for(let i in data){
		arr.push(i +':'+ data[i]);
	}
	sign = arr.sort().join('#');

	data.sign = md5(md5(sign) + app_secret)

    return new Promise((resolve,reject) => {
        if (method === 'get') {
            if (auth) {
				authRequest({
					url: url,
					method: method,
					params: data
				}).then(res => {
					resolve(res)
				}).catch(error=>{
					reject(error)
				})

            } else {
                baseRequest({
                    url: url,
                    method: method,
                    params: data
                }).then(res => {
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            }
        } else {
            let datas = data;

            if (stringify) {
                datas = Qs.stringify(data);
            }
            if (auth) {
				authRequest({
					url: url,
					method: method,
					data: datas,
				}).then(res => {
					resolve(res)
				}).catch(error=>{
					reject(error)
				})

            } else {
                baseRequest({
                    url: url,
                    method: method,
                    data: datas,
                }).then(res => {
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            }
        }
    })
}

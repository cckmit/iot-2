import axios from 'axios';

function toLogin() {
    const toUrl = top.window.location.href;
    const loginUrl = (top.window.location.pathname === '/Manage/') ? '/Manage/Login' : `/Manage/Login?toUrl=${toUrl}`;

    setTimeout(() => {
        top.window.location.replace(loginUrl);
    }, 500)
}

axios.defaults.baseURL = ''; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

//配置发送请求前的拦截器 可以设置token信息 
axios.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(res => {
    //这里面写所需要的代码
    if (res.data.code == '602') {
        //全局登陆过滤，当判读token失效或者没有登录时 返回登陆页面
        toLogin();
        return false;
    }
    if (res.data.code == '500') {
        toLogin();
        return false;
    }
    return Promise.resolve(res.data);
}, (error) => {
    return Promise.reject(error);
})

export default axios;
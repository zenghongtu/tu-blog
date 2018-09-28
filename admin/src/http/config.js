/**
 * Created by zenghongtu on 09/09/2018
 * Desc: config
 */

import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:9000/'
        : 'https://blog.zenghongtu.com/api/v1/';

const ajax = axios.create({
    timeout: 5000,
    baseURL,

});

ajax.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
ajax.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';

ajax.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        token && (config.headers.Authorization = `Bearer ${token}`);
        return config
    },
    (err) => {
        throw new Error('请求服务器出错')
    }
);

ajax.interceptors.response.use(
    (res) => {
        if (/^2/.test(res.status)) {
            return (res && res.data) || ''
        } else {
            throw new Error(res.data)
        }
    },
    (err) => {
        throw new Error(err.response.data)
    }
);

export default ajax

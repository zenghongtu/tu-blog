/**
 * Created by zenghongtu on 09/09/2018
 * Desc: config
 */

import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/v1/'
        : 'https://zenghongtu.com/api/v1/';

const ajax = axios.create({
    timeout: 5000,
    baseURL
});

ajax.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        throw new Error('请求服务器出错')
    }
);

ajax.interceptors.response.use(
    (res) => {
        if (res.status === 200) {
            return (res && res.data) || ''
        } else {
            throw new Error(res.data.message)
        }
    },
    (err) => {
        if (err.response.status === 504 || err.response.status === 404) {
            alert('服务器问题')
        } else if (err.response.status === 403) {
            alert('权限不足')
        } else {
            alert('未知错误')
        }
        throw new Error(err)
    }
);

export default ajax

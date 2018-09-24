/**
 * Created by zenghongtu on 03/09/2018.
 * Desc: config
 */

import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'http://api.zenghongtu.com/v1';

const ajax = axios.create({
    timeout: 5000,
    baseURL
});

ajax.interceptors.request.use((config) => {
    const storage = window.localStorage;
    const _id = storage.getItem('_id');
    _id && (config.headers._id = _id);
    if (storage.getItem('_ida') === ':') {
        config.headers._ida = ':';
        storage.removeItem('_ida')
    }
    return config
}, (err) => {
    alert('发起请求超时');
    throw new Error('发起请求超时')
});

ajax.interceptors.response.use((res) => {
    if (/^2/.test(res.status)) {
        const {_id, _ida} = res.headers;
        const storage = window.localStorage;
        if (_id) {
            storage.setItem('_id', _id);
        }
        if (_ida) {
            storage.setItem('_ida', _ida)
        }
        return res
    } else {
        throw new Error(res.data.message)
    }
}, (err) => {
    if (err.response.status === 504 || err.response.status === 404) {
        alert('服务器问题')
    } else if (err.response.status === 403) {
        alert('权限不足')
    } else {
        alert('未知错误')
    }
    throw new Error(err)
});

export default ajax

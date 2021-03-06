/**
 * Created by zenghongtu on 03/09/2018.
 * Desc: config
 */

import axios from 'axios';
import $loading from '../components/common/loading'
import debounce from '../util/debounce'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : 'https://blog.zenghongtu.com/api/v1/';

const ajax = axios.create({
    timeout: 5000,
    baseURL
});

const startLoading = debounce(() => {
    $loading.show()
}, 50);

const endLoading = debounce(() => {
    $loading.hide()
}, 300);


ajax.interceptors.request.use((config) => {
    if (config.url.includes('/articles')) startLoading();
    const _id = localStorage.getItem('_id');
    _id && (config.headers._id = _id);
    if (localStorage.getItem('_ida') === ':') {
        config.headers._ida = ':';
        localStorage.removeItem('_ida')
    }

    return config
}, (err) => {
    alert('发起请求超时');
    throw new Error('发起请求超时')
});

ajax.interceptors.response.use((res) => {
    if (/^2/.test(res.status)) {
        if (res.request.responseURL.includes('/articles')) endLoading();
        const {_id, _ida} = res.headers;
        if (_id) {
            localStorage.setItem('_id', _id);
        }
        if (_ida) {
            localStorage.setItem('_ida', _ida)
        }
        return res
    } else {
        throw new Error(res.data.message)
    }
}, (err) => {
    if (err.request.responseURL.includes('/articles')) endLoading();
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

/**
 * Created by zenghongtu on 26/09/2018.
 * Desc: debounce
 */


export default function (fn, timeout) {
    let timer, context, args;

    return function () {
        context = this;
        args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, timeout)
    }
}

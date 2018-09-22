/**
 * Created by zenghongtu on 22/09/2018.
 * Desc: rem
 */

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if ((10 * (clientWidth / 320)) <= 16) {
                docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
            } else {
                docEl.style.fontSize = 16 + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

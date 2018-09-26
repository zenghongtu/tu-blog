/**
 * Created by zenghongtu on 26/09/2018.
 * Desc: index
 */

import Vue from 'vue'
import loading from './src'

const LoadingConstructor = Vue.extend(loading);

let isAppend = false;


class Loading {
    constructor(options) {
        this.options = options;
        this.instance = new LoadingConstructor(this.options).$mount()
    }
    show() {
        if (isAppend) {
            this.instance.show()
        } else {
            document.body.appendChild(this.instance.$el);
            Vue.nextTick(() => this.instance.visible = true);
            isAppend = true
        }
    }

    hide() {
        this.instance.hide()
    }

}

export default new Loading()

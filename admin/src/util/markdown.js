/**
 * Created by zenghongtu on 25/09/2018.
 * Desc: markdown
 */


import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    }
});

export default marked

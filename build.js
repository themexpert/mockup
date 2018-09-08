import Vue from 'vue';
import Editor from './src/components/Editor';

window.$ = window.jquery = window.jQuery = require('jquery');
require('popper.js');
require('bootstrap');

const app = new Vue({
    render: h => h(Editor),
}).$mount('#app');

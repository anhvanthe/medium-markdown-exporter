'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.axiosDefault = axiosDefault;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function axiosDefault() {
    console.log('Axios configuration');
    if (!process.env.MEDIUM_TOKEN) console.error("please set Medium token as 'export MEDIUM_TOKEN=\"<token>\"'");

    _axios2.default.defaults.baseURL = 'https://api.medium.com/v1';
    _axios2.default.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.MEDIUM_TOKEN;
    _axios2.default.defaults.headers.get['Content-Type'] = 'application/json';
    _axios2.default.defaults.headers.get['Accept'] = 'application/json';
}
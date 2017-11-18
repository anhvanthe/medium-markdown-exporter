'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mappers = require('./mappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profile = function () {
    function Profile(userName) {
        _classCallCheck(this, Profile);

        this.userName = userName;
        this.profile = null;
    }

    _createClass(Profile, [{
        key: 'getProfile',
        value: function getProfile() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (_this.profile) resolve(_this.profile);else {
                    _axios2.default.get('/me', {
                        transformResponse: [].concat(_axios2.default.defaults.transformResponse, _mappers.mapProfile)
                    }).then(function (response) {
                        _this.profile = response.data;
                        resolve(_this.profile);
                    }).catch(function (error) {
                        return console.error(error);
                    });
                }
            });
        }
    }, {
        key: 'getPosts',
        value: function getPosts() {
            return _axios2.default.get('/@' + this.userName + '/latest?limit=2', {
                baseURL: 'https://medium.com',
                transformResponse: [_mappers.mapMediumData, _mappers.mapPosts]
            }).then(function (response) {
                return response.data;
            });
        }
    }]);

    return Profile;
}();

exports.default = Profile;
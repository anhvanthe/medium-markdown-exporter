'use strict';

var _configurate = require('./configurate');

var _profile = require('./medium/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _configurate.axiosDefault)();

var profile = new _profile2.default('qjuanp');

profile.getProfile().then(function (profile) {
    return console.log('Profile:', profile);
});

profile.getPosts().then(function (posts) {
    return console.log('Posts:', posts);
});

console.log("Token:", process.env.MEDIUM_TOKEN);
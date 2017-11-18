'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapProfile = mapProfile;
exports.mapMediumData = mapMediumData;
exports.mapPosts = mapPosts;
function mapProfile(response) {
    return response.data;
}

function mapMediumData(response) {
    return JSON.parse(response.replace('])}while(1);</x>', ''));
}

function mapPosts(response) {
    var objectPosts = response.payload.references.Post;
    var postsIds = Object.keys(objectPosts);

    return postsIds.reduce(function (posts, postId) {
        return posts.concat([objectPosts[postId]]);
    }, []);
}
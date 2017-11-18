export function mapProfile(response) {
    return response.data
}

export function mapMediumData(response) {
    return JSON.parse(response.replace('])}while(1);</x>', ''))
}

export function mapPosts(response) {
    var objectPosts = response
        .payload
        .references
        .Post
    var postsIds = Object.keys(objectPosts)

    return postsIds
        .reduce((posts, postId) => {
            return posts.concat([objectPosts[postId]])
        }, [])
}
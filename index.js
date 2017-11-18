import { axiosDefault } from './configurate'
import Profile from './medium/profile'
import Post from './medium/post'

axiosDefault()

var profile = new Profile('qjuanp')

profile.getProfile()
    .then(profile => console.log('Profile:', profile))

profile.getPosts()
    .then(mediumPosts => {
        console.log('Posts:', mediumPosts)
        return mediumPosts.map(post => new Post({ userName: 'qjuanp', id: post.id }))
    })
    .then(posts => posts.map(post => post.getContent()))
    .then(content => Promise.all(content))
    .then(content => console.log(content))

console.log("Token:", process.env.MEDIUM_TOKEN)


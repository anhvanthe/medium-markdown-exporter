import { axiosDefault } from './configurate'
import Profile from './medium/profile'

axiosDefault()

var profile = new Profile('qjuanp')

profile.getProfile()
    .then(profile => console.log('Profile:', profile))

profile.getPosts()
    .then(posts => console.log('Posts:', posts))

console.log("Token:", process.env.MEDIUM_TOKEN)


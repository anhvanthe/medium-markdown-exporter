import axios from 'axios'
import { mapMediumData, mapProfile, mapPosts } from './mappers'

class Profile {
    constructor(userName) {
        this.userName = userName
        this.profile = null
    }

    getProfile() {
        return new Promise((resolve, reject) => {
            if (this.profile)
                resolve(this.profile)
            else {
                axios
                    .get('/me', {
                        transformResponse: [].concat(axios.defaults.transformResponse, mapProfile)
                    })
                    .then(response => {
                        this.profile = response.data
                        resolve(this.profile)
                    })
                    .catch(error => console.error(error))
            }
        })
    }

    getPosts() {
        return axios
            .get(`/@${this.userName}/latest?limit=2`, {
                baseURL: 'https://medium.com',
                transformResponse: [mapMediumData, mapPosts]
            })
            .then(response => response.data);
    }
}

export { Profile as default }
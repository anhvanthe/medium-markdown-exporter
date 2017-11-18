import axios from 'axios'
import { mapMediumData } from './mappers'
import { HTTP_REGEX } from '../common/regular-expressions'

class Post {
    constructor({ id, userName, mediumUrl }) {
        this.id = id
        this.userName = userName
        this.mediumUrl = mediumUrl
        this.content = {}
    }

    getPostUrl() {
        if (this.id && this.userName)
            return `https://medium.com/${this.userName}/${this.id}`
        else if (this.mediumUrl && this.mediumUrl.match(HTTP_REGEX))
            return this.mediumUrl
        else throw 'There is not information to get post'
    }

    // Get content with medium json representation
    getContent() {
        return axios
            .get(this.getPostUrl(), {
                transformResponse: mapMediumData
            })
            .then(({ data: { success, payload } }) => {
                if (!success) throw `Cannot retrieve ${getPostUrl()}`

                this.content = payload.value.content

                return this.content
            })
    }
}

export { Post as default }
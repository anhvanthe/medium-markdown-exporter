import axios from 'axios'
import { mapMediumData } from './mappers'
import { HTTP_REGEX } from '../common/regular-expressions'

export class Post {
    constructor({ id, username, mediumUrl }) {
        this.isLoaded = false

        this.id = id
        this.username = username
        this.mediumUrl = mediumUrl

        this.postJson = {}
    }

    /**
     * Builds post url
     */
    get url() {
        if (this.id && this.username)
            return `https://medium.com/@${this.username}/${this.id}`
        else if (this.mediumUrl && this.mediumUrl.match(HTTP_REGEX))
            return this.mediumUrl
        else throw 'There is no enough information to get post'
    }

    /**
     * Load post information
     */
    load() {
        return axios
            .get(this.url, {
                transformResponse: mapMediumData
            })
            .then(({ data: { success, payload } }) => {
                if (!success) throw `Cannot retrieve ${this.url}`

                this.postJson = payload.value
                this.isLoaded = true

                return this
            })
            .catch(({ response }) => {

                // TODO: Log error
                console.error(`Request error code=${response.status} message=${response.data.error}`)
                return this
            })
    }


    /** Post propertiess*/

    get title() {
        this.__validateLoad()

        return this.postJson.title
    }

    get subtitle() {
        this.__validateLoad()

        return this.postJson.content.subtitle
    }

    get slug() {
        this.__validateLoad()

        return this.postJson.slug
    }

    get createdAt() {
        this.__validateLoad()

        return new Date(this.postJson.createdAt)
    }

    get updatedAt() {
        this.__validateLoad()

        return new Date(this.postJson.updatedAt)
    }

    get body() {
        this.__validateLoad()

        return this.postJson.content.bodyModel
    }

    get tags() {
        this.__validateLoad()

        var mediumTags = this.postJson.virtuals.tags

        return mediumTags.map(tag => tag.name)
    }

    /***/

    toJson() {
        this.__validateLoad()

        return this.postJson
    }

    __validateLoad() {
        if (!this.isLoaded) throw 'Load post first'

        // information not loaded correctly
        if (!this.postJson.id) throw 'Post not loaded'
    }
}
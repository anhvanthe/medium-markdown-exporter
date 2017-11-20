import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import moxios from 'moxios'
import { readFile } from 'fs'
import { Post } from '../../src/medium/post'


chai.use(chaiAsPromised)
const expect = chai.expect

describe('Medium Post representation', () => {

    beforeEach(() => moxios.install())

    afterEach(() => moxios.uninstall())


    describe('Expected scenarios', () => {

        it('url: Medium url', () => {
            const postUrl = 'https://medium.com/post',
                post = new Post({ mediumUrl: postUrl })

            expect(post.url)
                .to.equal(postUrl)
        })

        it('url: Medium url using username and post id', () => {
            const id = 'validid',
                username = 'qjuanp',
                post = new Post({ id, username })

            expect(post.url)
                .to.equal('https://medium.com/@qjuanp/validid')
        })

        it('load: Load medium post json information', () => {
            const postUrl = 'https://medium.com/post',
                post = new Post({ mediumUrl: postUrl })

            moxios.stubRequest(postUrl, {
                status: 200,
                response: { value: { id: 'validid', title: 'Valid post' } }
            })

            const load = post.load()

            expect(load)
                .to.eventually
                .includes({ isLoaded: true, title: 'Valid post' })
        })
    })


    describe('Exception scenarios', () => {

        it('url: Not enough information', () => {
            const post = new Post({})

            expect(() => post.url)
                .to.throw('There is no enough information to get post')
        })

        it('load: Not enough information', () => {
            const post = new Post({})

            expect(() => post.load())
                .to.throw('There is no enough information to get post')
        })

        it('load: Error on medium services', () => {
            const postUrl = 'https://medium.com/post',
                post = new Post({ mediumUrl: postUrl })

            moxios.stubRequest(postUrl, {
                status: 500,
                response: {}
            })

            expect(post.load())
                .to.eventually
                .includes({ isLoaded: false })
        })

        it('load: post not found', () => {
            const postUrl = 'https://medium.com/post',
                post = new Post({ mediumUrl: postUrl })

            moxios.stubRequest(postUrl, {
                status: 404,
                response: {
                    "success": false,
                    "error": "Post not found"
                }
            })

            expect(post.load())
                .to.eventually
                .includes({ isLoaded: false })
        })
    })
})
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { readFile } from 'fs'
import { Post } from '../../src/medium/post'


chai.use(chaiAsPromised)
const expect = chai.expect

describe('Medium Post representation', () => {

    describe('Expected scenarios', () => {
        let mediumPostJson;

        beforeEach(() => {
            readFile('tests/data/renombrar-objetos-y-namespaces-en-c.json',
                (err, data) => {
                    if (err) throw err
                    mediumPostJson = JSON.parse(data)
                })
        })

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

        it('load: Load medium post json information', async () => {
            const postUrl = 'https://medium.com/post',
                post = new Post({ mediumUrl: postUrl }),
                mock = new MockAdapter(axios)

            mock.onGet(postUrl)
                .reply(200, JSON.stringify({ success: true, payload: { value: mediumPostJson } }))

            await post.load()

            expect(post.isLoaded).to.be.true
            expect(post.id).to.be.equal('a6a44bbd3ac6')
            expect(post.mediumUrl).to.be.equal('https://medium.com/@qjuanp/renombrar-objetos-y-namespaces-en-c-a6a44bbd3ac6')
            expect(post.username).to.be.equal('7367fbed8fdd')
            expect(post.title).to.be.equal('Renombrar objetos y Namespaces en C#')
            expect(post.subtitle).to.be.equal('Esta es una de esas herramientas “medio ocultas” (o bueno, yo por lo menos me tarde en encontrarla) en el lenguaje C# que les va quitar…')
            expect(post.slug).to.be.equal('renombrar-objetos-y-namespaces-en-c')
            expect(post.createdAt,'Wrong created date').to.be.at.least(new Date(1454388281379))
            expect(post.updatedAt, 'Wrong updated date').to.be.at.least(new Date(1511053976877))
            expect(post.body).to.have.property('paragraphs')
            expect(post.body).to.have.property('sections')
            expect(post.body.paragraphs).to.not.be.empty
            expect(post.body.sections).to.not.be.empty
            expect(post.tags).to.not.be.empty
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
                post = new Post({ mediumUrl: postUrl }),
                mock = new MockAdapter(axios)

            mock.onGet(postUrl)
                .reply(500, {
                    success: false,
                    message: "Internal server error"
                })

            expect(post.load())
                .to.eventually
                .includes({ isLoaded: false })
        })

        it('load: post not found', () => {
            const postUrl = 'https://medium.com/post',
                post = new Post({ mediumUrl: postUrl }),
                mock = new MockAdapter(axios)

            mock.onGet(postUrl)
                .reply(404, {
                    success: false,
                    message: "Post not found"
                })

            expect(post.load())
                .to.eventually
                .includes({ isLoaded: false })
        })
    })
})
class MarkdownConverter {
    constructor(post){
        this.post = post
        this.markdown = null
    }

    convert() {
        if(!this.post) throw 'We need first the post'
        return this.post.getContent()
            .then(content => toMarkdown(content)) 
    }
}

function toMarkdown(content) {

}

export { MarkdownConverter as default }
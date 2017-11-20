import { Command } from 'commander'
import { MEDIUM_USERNAME, HTTP_REGEX } from './common/regular-expressions'

import { writeFile } from 'fs'
import { resolve } from 'path'
import { Post } from './medium/post'

var program = new Command()

program
    .version('0.0.1')
    .description('A way to export you medium posts to markdown')
    .option('-u, --username [username]', 'Medium user name', MEDIUM_USERNAME)
    .option('-p, --post [post]', 'Post to export', HTTP_REGEX)
    .option('-F, --format <format>', 'Export format', /^(md|json)$/i, 'md')
    .parse(process.argv)

console.log('User:', program.username)
console.log('Post:', program.post)
console.log('Format: ', program.format)

if (!program.post && program.forma !== 'json')
    throw 'other options are not accepted now'

var post = new Post({ mediumUrl: program.post })

post
    .load()
    .then(p => {
        var path = resolve('exports/test.json')

        writeFile(path, JSON.stringify(p.toJson(), null, 4), (err) => {
            if (!err) console.log('Done!', path)
            else console.error(err)
        })
    })
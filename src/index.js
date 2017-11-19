import { Command } from 'commander'
import { MEDIUM_USERNAME } from './common/regular-expressions'

var program = new Command()

program
    .version('0.0.1')
    .option('-u, --username [username]', 'Medium user name', MEDIUM_USERNAME)
    .option('-F, --format <format>', 'Export format', /^(md|json)$/i, 'md')
    .parse(process.argv)

console.log('User:', program.username)
console.log('Format: ', program.format)


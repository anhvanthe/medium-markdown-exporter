
# Medium markdown exporter (under development)
Export your medium post to markdown

## Getting 4ed
These instructions will get you a copy of the project up and running on your local machine

### Prerequisites
Just run command `npm install`

### Run
To get all post from one user just
    `npm start -u qjuanp`

## Options

* ~~Get all posts from user~~
    - `npm start -u qjuanp`
    - `npm start --user qjuanp`

* ~~Get one post using its url, markdown will be saved on./exports/<title-spinal-case>.md~~
    - `npm start -p https://medium.com/@qjuanp/renombrar-objetos-y-namespaces-en-c-a6a44bbd3ac6` 
    - `npm start --post-url https://medium.com/@qjuanp/renombrar-objetos-y-namespaces-en-c-a6a44bbd3ac6` 

* ~~Get all posts from user, markdown will be saved on  whereever-you-want/, default folder to store exported markdown is .exports/~~
    - `npm start -u qjuanp -d whereever-you-want/`
    - `npm start --user qjuanp --directory whereever-you-want/`

### Other options
This options were made only for testing purposes, bu who knows? could be usedful for you too

* ~~Get one post, you will need user and post id together~~
    - `npm start -u qjuanp -id a6a44bbd3ac6`
    - `npm start --user qjuanp -id a6a44bbd3ac6`

* ~~To generate useful tests I made a way to export post to json~~
    - `npm start -f json -p https://medium.com/@qjuanp/renombrar-objetos-y-namespaces-en-c-a6a44bbd3ac6`
    - `npm start --format json --user qjuanp -id a6a44bbd3ac6`

## Build with
- [Axios][axios] for http requests
- [Babel][babel] to use ES7💛
- [Javascript♥️][javascript] because why not?

# References
- [Medium's API documentation][medium api doc]
- Issue ["GET /posts - retrieve a list of user posts?"][medium api issue]



[medium api issue]: https://github.com/Medium/medium-api-docs/issues/30
[medium api doc]: https://github.com/Medium/medium-api-docs
[axios]: https://github.com/axios/axios
[babel]: https://babeljs.io
[javascript]: https://developer.mozilla.org/bm/docs/Web/JavaScript
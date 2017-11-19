import axios from 'axios'

export function axiosDefault() {
    console.log('Axios configuration')
    if (!process.env.MEDIUM_TOKEN)
        console.error("please set Medium token as 'export MEDIUM_TOKEN=\"<token>\"'")

    axios.defaults.baseURL = 'https://api.medium.com/v1'
    axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.MEDIUM_TOKEN}`
    axios.defaults.headers.get['Content-Type'] = 'application/json'
    axios.defaults.headers.get['Accept'] = 'application/json'
}
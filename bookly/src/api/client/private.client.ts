import axios from 'axios'
import queryString from 'query-string'
import { AxiosRequestHeaders } from 'axios'

axios.defaults.withCredentials = true

const baseUrl: string = 'http://localhost:3000/api/v1/'

const privateClient = axios.create({
    baseURL: baseUrl,
    paramsSerializer: {
        encode: (params) => queryString.stringify(params),
    },
})

privateClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        } as AxiosRequestHeaders,
    }
})

privateClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data
        return response
    },
    (err) => {
        throw err.response.data
    }
)

export default privateClient

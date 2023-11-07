import privateClient from '../client/private.client'
// import axios, { AxiosError } from 'axios'

const userEndpoints = {
    menudir: 'dir/all',
}

const menuApi: any = {
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.menudir)
            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default menuApi

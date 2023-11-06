import privateClient from '../client/private.client'
import { extractNameFromEmail } from '../../lib/utils'
import type { LoginForm } from '@/models/User'
import type { SignUpForm } from '@/models/User'
import axios, { AxiosError } from 'axios'
import { unknown } from 'zod'

const userEndpoints = {
    login: 'login',
    signup: 'signup',
    getInfo: 'user/me',
}

type LoginSuccessResponse = {
    message: string
    token: string
}

const userApi: any = {
    login: async ({ email, password }: LoginForm) => {
        try {
            const response: LoginSuccessResponse = await privateClient.post(
                userEndpoints.login,
                {
                    email,
                    password,
                }
            )

            return { response }
        } catch (err: unknown) {
            const errors = err as Error | AxiosError
            if (!axios.isAxiosError(errors)) {
                return { err }
            }
            console.log(err)
        }
    },

    signup: async ({ email, password }: SignUpForm) => {
        try {
            const response = await privateClient.post(userEndpoints.signup, {
                email,
                password,
                name: extractNameFromEmail(email),
            })

            return { response }
        } catch (err) {
            return { err }
        }
    },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getInfo)

            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default userApi

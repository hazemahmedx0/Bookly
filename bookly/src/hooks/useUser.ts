import userApi from '../api/modules/user.api'
import { useQuery } from '@tanstack/react-query'

export function useUser() {
    const getCurrentUser = async () => {
        const { response, err } = await userApi.getInfo()
        if (err) {
            return err
        }
        return response
    }

    const { isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    })

    return {
        isLoading,
        user,
        isAuthenticated: user?.user?.id,
    }
}

import useAuth from "./useAuth"
import useAxiosPrivate from "./usePrivate"

export default function useUser() {

    const { isLoggedIn, setUser, setIsLoggedIn } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()

    async function getUser() {
        if (!isLoggedIn) {
            return
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/user')
            setUser(data)
        } catch (error) {
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh_token')
            localStorage.setItem('isLoggedIn', false)
        }
    }

    return getUser
}

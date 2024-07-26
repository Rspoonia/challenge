import useAuth from "./useAuth"
import { axiosPrivateInstance } from "../api/apiConfig"

export default function useLogout() {
    const { setUser, setAccessToken, setCSRFToken, setIsLoggedIn } = useAuth()

    const logout = async () => {
        try {
            const response = await axiosPrivateInstance.post("auth/logout")
            setAccessToken(null)
            setCSRFToken(null)
            setIsLoggedIn(false)
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh_token')
            localStorage.setItem('isLoggedIn', false)
            setUser({})

        } catch (error) {
            setAccessToken(null)
            setCSRFToken(null)
            setIsLoggedIn(false)
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh_token')
            localStorage.setItem('isLoggedIn', false)
            setUser({})
        }
    }

    return logout
}
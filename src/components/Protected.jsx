import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../utils"
import { BASE_URL } from "../CONSTANTS"
import { login, logout } from "../store/slices/userSlice"

export const Protected = ({ children }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    const fetchSelf = async () => {
        try {
            const self = await apiRequest(`${BASE_URL}/self`)

            if (self.error) {
                dispatch(logout())
                localStorage.removeItem("token")
                navigate("/login")
            }

            dispatch(login(self.user))

        } catch (err) {
            dispatch(logout())
            localStorage.removeItem("token")
            navigate("/login")
        }
    }

    //
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }

        if (!user) {
            fetchSelf()
        }
    })

    return (<>{user ? children : null}</>)
}
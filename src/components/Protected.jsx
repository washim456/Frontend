import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Protected = ({children}) => {

    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    //
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    })

    return (<>{ user ? children : null}</>)
}
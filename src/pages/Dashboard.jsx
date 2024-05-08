import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../CONSTANTS"
import { setOrg } from "../store/slices/orgSlice"
import { Lists } from "../components"
import { useNavigate } from "react-router-dom"
import { apiRequest, getToken } from "../utils"

export const DashboardPage = () => {
    // fetch organisation and display here

    const [organisation] = useSelector(state => [state.org.org])
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {

        const getOrg = async () => {
            try {
                // const resp = await fetch(`${BASE_URL}/organisation`, {
                //     headers: {
                //         token : getToken()
                //     }
                // })

                const resp = await apiRequest(`${BASE_URL}/organisation`)
                console.log(resp)

                // const data = await resp.json()

                // if (resp.status > 299) {
                //     throw new Error(resp.statusText)
                // }
                dispatch(setOrg(resp))

            } catch (err) {
                window.alert(err)
            }
        }

        if (!organisation) {
            getOrg()
        }
    }, [])


    return (
        <>
            <div className="h-[90%] overflow-scroll">
                <Lists />

            </div>
        </>
    )
}
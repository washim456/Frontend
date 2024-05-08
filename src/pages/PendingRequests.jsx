import { useEffect, useState } from "react"
import { BASE_URL } from "../CONSTANTS"
import { Pending } from "../components"
import { apiRequest } from "../utils"

export const PendingRequestPage = () => {

    const [pending, setPending] = useState([])

    useEffect(() => {
        const fetchAllPending = async() => {
            // const resp = await fetch(`${BASE_URL}/pending`)
            // const jsonResp = await resp.json()
            try{
                const data = await apiRequest(`${BASE_URL}/pending`)
                setPending(data)

            }catch{
                setPending([])
            }
        }

        fetchAllPending()
    }, [])

    console.log(pending)
    return (
        <>
            <Pending data={pending} />
        </>
    )
}
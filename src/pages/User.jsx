import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BASE_URL } from "../CONSTANTS"

import { Button, InputText, Select } from "../components"
import { useSelector } from "react-redux"
import { apiRequest } from "../utils"

import Calendar from 'react-calendar';

import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export const UserPage = () => {

    const [currentUser, setCurrentUser] = useState(null)

    const loggedInUser = useSelector(state => state.user.user)

    const { userId } = useParams()

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {

        const fetchUser = async () => {
            // const resp = await fetch(`${BASE_URL}/users/${userId}`, {
            //     headers: { "Content-Type": "application/json" },
            // })

            // const data = await resp.json()
            try{
                const data = await apiRequest(`${BASE_URL}/users/${userId}`)
                setCurrentUser(data)
            }catch{
                setCurrentUser(null)
            }

        }

        fetchUser()

    }, [userId])



    useEffect(() => {
        console.log("run", loggedInUser, currentUser)

        // allow update or delete of own accounts
        if (loggedInUser?._id === currentUser?._id) {
            setDisabled(false)
            return
        }

        // superadmin can update or delete all
        if(loggedInUser.access.role === "superadmin"){
            setDisabled(false)
            return
        }

        if(loggedInUser.access.role === "admin" && !["superadmin", "intern"].includes(currentUser.access.role)){
            setDisabled(false)
            return
        }


        // owner can update admin data
        // admin can update intern data
        // intern can't

    }, [loggedInUser, currentUser])


    console.log("disabled", disabled)

    const capitalize = str => {
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
    }

    const updateUser = async () => {
        // try{
        //     await apiRequest()
        // }
    }

    const handleChange = (e,name) => {
        console.log("event", e)
        const  value  = e?.target?.value || e

        setCurrentUser(state => ({...state, [name] : value}))
    }

    console.log(currentUser)
    return (
        <div className="">
            {currentUser ? (
                <div className="flex flex-col justify-center items-center w-[100%] gap-4">
                    <div>
                        <p>Name </p> <InputText value={currentUser?.name} disabled={disabled} onChange={e => handleChange(e,"name")}/>
                    </div>
                    <div>
                        <p>Email </p><InputText type="email" value={currentUser?.email} disabled={disabled} onChange={e => handleChange(e,"email")}/>
                    </div>
                    <div className="w-[18%]">
                        <p>Role </p> <Select options={["Admin", "Intern"]} value={capitalize(currentUser.access.role)} disabled={disabled} onChange={e => handleChange(e,"role")}/>
                    </div>
                    <label>
                        Start Date
                        <DatePicker value={currentUser?.startDate} onChange={e => handleChange(e,"startDate")}/>
                    </label>
                    <label>
                        End Date
                        <DatePicker value={currentUser?.endDate} onChange={e => handleChange(e,"endDate")} />
                    </label>
                    <div className="flex flex-col gap-4">
                        <Button variant="accent" disabled={disabled ? "disabled" : ""}>Update</Button>
                        <Button variant="error" disabled={disabled ? "disabled" : ""}>Delete User</Button>
                    </div>
                    {/* <Calendar /> */}
                </div>

            ) : <></>}
        </div>
    )
}
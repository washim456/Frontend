import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../CONSTANTS"
import { apiRequest } from "../utils"
import { Button } from "./form"
import { setOrg } from "../store/slices/orgSlice"
import { useDispatch, useSelector } from "react-redux"

export const Pending = () => {
    const data = useSelector(state => state.pending.pending)
    // const navigate = useNavigate(0)
    const dispatch = useDispatch()

    const updateRequest = async (user, status) => {
        // update request
        await apiRequest(`${BASE_URL}/users/${user._id}`, {
            access : {
                role : user.access.role,
                status : status
            }
        }, "PATCH")

        const resp = await apiRequest(`${BASE_URL}/organisation`)
        dispatch(setOrg(resp))
    }

    return (
        <>
            <div className="w-[90%] mx-auto overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dept || "N/A"}</td>
                                <td>{user.access.role}</td>
                                <td>
                                    <Button classNames={"btn-sm"} variant="success" type="">Approve</Button>
                                    <Button classNames={"btn-sm ml-2"} variant="error" type="" submitFn={() => updateRequest(user, "rejected")}>Reject</Button>
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
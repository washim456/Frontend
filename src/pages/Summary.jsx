import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../CONSTANTS"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { updateOne } from "../store/slices/internSlice"
import { apiRequest } from "../utils"
import { useNavigate } from "react-router-dom"

export const SummaryPage = () => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        // only admin can access this page
        if(user.role === "intern"){
            navigate("/")
        }
    },[])

    const interns = useSelector(state => state.interns.interns)



    const [loading , setLoading] = useState(false)
    
    const removeSummaryReport = async (summary, intern) => {
        try {
            setLoading(true)
            const res = await apiRequest(`${BASE_URL}/interns/summary-report/${intern._id}/${summary._id}`, null, "DELETE")
            if (res.error) {
                toast.error(res.message)
                setLoading(false)
                return
            }
            dispatch(updateOne(res))
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className={`w-[80%] pt-[80px] ml-[18%] flex flex-col gap-4 ${user.role === "intern" ? "close" : ""}`}>
            <p className="text-lg">Summary Reports</p>
            <div>
                {interns.map(intern => (
                    <div className="my-5 border p-4">
                        <p className="text-lg font-medium">{intern.name}</p>
                        <div className="mt-2">
                            {intern.summaryReport?.length ? (
                                <div className="table-body border mt-2">
                                {intern.summaryReport.map((report, index) => (
                                    <>
                                        <div key={index} className="flex h-[55px] p-4">
                                            <div className="w-[50%] flex items-center">{report.fileName}</div>
                                            <div className="w-[50%] flex justify-end items-center gap-4">
                                                <a target="_blank" className="btn btn-xs btn-outline btn-success" href={`${BASE_URL}/uploads/${report.url}`} download>Download</a>
                                                <a className="btn btn-xs btn-outline btn-error" onClick={() => removeSummaryReport(report, intern)}>Delete</a>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                ))}
                            </div>
                            ) : (
                                <div className="border py-4 pl-4">
                                    No report uploaded
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}
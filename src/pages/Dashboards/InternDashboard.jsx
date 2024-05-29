// login user 

import { useDispatch, useSelector } from "react-redux"
import { Button, InputText, Select, FileInput } from "../../components"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { apiRequest, fileRequest, getDisplayDate } from "../../utils";
import { BASE_URL } from "../../CONSTANTS";
import Calendar from 'react-calendar';
import { login } from "../../store/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { updateOne } from "../../store/slices/internSlice";


export const InternDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const user = useSelector(state => state.user.user) // logged in user

    const interns = useSelector(state => state.interns.interns)

    const data = id ? interns.find(intern => intern._id === id) : user

    console.log("Data", data)

    const initialState = {
        name: "",
        email: "",
        password: "",
        dept: "",
        contactNo: "",
        resume: {},
        summaryReport: []
    }

    const [userState, setUserState] = useState(initialState)
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        setUserState(state => {
            return {
                ...state,
                ...data
            }
        })

        setFeedback(data.feedBack)
    }, [data])


    useEffect(() => {
        console.log(user.role, data._id !== user._id, user.role !== "admin")
        if (data._id !== user._id && user.role !== "admin") {
            navigate("/")
            toast.error("You don't have permission to view this")
        }
    })


    const [newSummaryReport, setNewSummaryReport] = useState("")
    const [showStartCalendar, setShowStartCalendar] = useState(false)
    const [showEndCalendar, setShowEndCalendar] = useState(false)

    const [loading, setLoading] = useState(false)

    const updateStore = (data) => {
        if (id) {
            // update intern
            dispatch(updateOne(data))
        } else {
            //update user
            dispatch(login(data))
        }

        toast.success("updated successfully")
    }

    const uploadResume = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData();

        const file = userState.resume

        formData.append("title", file.name)
        formData.append("file", file);

        if (!file) {
            toast.error("Please select a file")
            return
        }

        try {
            setLoading(true)
            const res = await fileRequest(`${BASE_URL}/interns/resume/${userState._id}`, formData, "PATCH", "multipart/form-data")
            // dispatch(login(res)) update interns or user
            if (res.error) {
                toast.error(res.message)
                setLoading(false)
                return
            }

            updateStore(res)
            setLoading(false)

        } catch (err) {
            toast.error("Something went wrong")
        }


    }

    const handleSelectFile = (e, name) => {
        setUserState(state => {
            return {
                ...state,
                [name]: e.target.files[0]
            }
        })

    }

    const handleSelectSummaryReport = (e) => {
        setNewSummaryReport(e.target.files[0])
    }

    const removeSummaryReport = async (summary) => {

        try {
            setLoading(true)
            const res = await apiRequest(`${BASE_URL}/interns/summary-report/${userState._id}/${summary._id}`, null, "DELETE")
            if (res.error) {
                toast.error(res.message)
                setLoading(false)
                return
            }

            updateStore(res)
            setLoading(false)
        } catch (err) {
            toast.error("Something went wrong")
        }
    }

    const handleInputChange = (e, name) => {
        let value

        if (e.target) value = e.target.value
        else value = e.toString()

        setUserState(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }

    const uploadSummaryReport = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData();

        const file = newSummaryReport

        if (!file) {
            toast.error("Please select a valid summary report")
        }

        formData.append("title", file.name)
        formData.append("file", file);

        try {
            const res = await fileRequest(`${BASE_URL}/interns/summary-report/${userState._id}`, formData, "PATCH", "multipart/form-data")

            if (res.error) {
                toast.error(res.message)
                setLoading(false)
                return
            }
            // dispatch(updateOne(res))
            updateStore(res)
            handleCloseModal()
            setLoading(false)
        } catch (err) {
            toast.error("Something went wrong")
        }
    }


    const updateInternData = async () => {
        const { name, email, dept, internshipType, contactNo, referredBy, paid, startDate, endDate } = userState

        const data = {
            name, email, dept, internshipType, contactNo, referredBy, paid, startDate, endDate, feedBack: feedback
        }

        try {
            const res = await apiRequest(`${BASE_URL}/interns/${userState._id}`, data, "PATCH")
            if (res.error) {
                toast.error(res.message)
                setLoading(false)
                return
            }

            updateStore(res)
            setLoading(false)

        } catch (err) {
            toast.error("Something went wrong")
        }

    }

    console.log("user state", userState)

    const handleFeedbackChange = (e) => {
        const { value } = e.target

        // check value words length, in case of copy paste
        const valueLength = value?.split(" ")?.length

        if (valueLength > 50) {
            toast.error("Can not type more than 50 words")
            return
        }

        const feedbackLength = feedback?.split(" ")?.length

        if (feedbackLength > 50) {
            toast.error("Can not type more than 50 words")
            return
        }

        setFeedback(e.target.value)
    }

    const handleCloseModal = e => {
        e?.preventDefault()
        document.getElementById('my_modal_1').close()
    }

    const internshipTypeOptions = [{ label: "Residential", value: "residential" }, { label: "Non-Residential", value: "non-residential" }, { label: "One day visit", value: "onedayvisit" }]

    return (
        <div className={`w-[80%] pt-[80px] ml-[18%] flex flex-col mx-auto justify-center items-center gap-4 ${user.role === "intern" ? "close" : ""}`}>
            {/* <div className="mt-[50px]"> */}
            {loading ? (
                <div className="h-[80vh] flex items-center">
                    <AiOutlineLoading3Quarters color="oklch(var(--p))" fontSize={"48px"} className="animate-spin" />
                </div>
            ) : (
                <>
                    <div className="w-full flex justify-between mt-4">
                        <p className="text-xl font-semibold">Profile</p>
                        <Button outline={"outline"} classNames={"rounded-none"} submitFn={() => document.getElementById('my_modal_1').showModal()}>
                            <FaPlus />    Upload Summary Report
                        </Button>
                    </div>

                    <div className="w-full">
                        <div className="flex gap-4">
                            <InputText value={userState.name} label={"Name"} changeFn={(e) => handleInputChange(e, "name")} />
                            <InputText value={userState.email} label={"Email"} changeFn={(e) => handleInputChange(e, "email")} />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <InputText value={userState.dept} label={"Department"} changeFn={(e) => handleInputChange(e, "dept")} />
                            <InputText value={userState.contactNo} label={"Contact Number"} changeFn={(e) => handleInputChange(e, "contactNo")} />
                        </div>
                        <div className="flex gap-4 items-end justify-between mt-4">
                            <div className="w-[50%]">
                                <Select cl placeholder={"Internship Type"} value={userState.internshipType} options={internshipTypeOptions} changeFn={(e) => handleInputChange(e, "internshipType")} />
                            </div>
                            <div className="w-[50%]">
                                <InputText value={userState.referredBy} label={"Referred By"} changeFn={(e) => handleInputChange(e, "referredBy")} />
                            </div>
                        </div>
                        <div className="flex gap-4 items-end justify-between mt-4">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Feedback</span>

                                </div>
                                <textarea value={feedback} onChange={handleFeedbackChange} className="textarea textarea-bordered w-full resize-none"></textarea>
                            </label>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="w-[50%] flex flex-col justify-center relative border">
                                <div className="flex justify-between items-center p-4">
                                    <p>Start date</p>
                                    <p>{getDisplayDate(userState.startDate)}</p>
                                    <Button type=" " submitFn={() => setShowStartCalendar(state => !state)}><FaPlus /></Button>

                                </div>
                                {showStartCalendar ? (
                                    <Calendar className={"absolute right-0 top-16"} value={userState.startDate} onChange={(e) => handleInputChange(e, "startDate")} />
                                ) : null}
                            </div>
                            <div className="w-[50%] flex flex-col justify-center relative border">
                                <div className="flex justify-between items-center p-4">
                                    <p>End date</p>
                                    <p>{getDisplayDate(userState.endDate)}</p>
                                    <Button type=" " submitFn={() => setShowEndCalendar(state => !state)}><FaPlus /></Button>
                                </div>
                                {showEndCalendar ? (
                                    <Calendar className={"absolute right-0 top-16"} value={userState.endDate} onChange={(e) => handleInputChange(e, "endDate")} />
                                ) : null}
                            </div>
                        </div>
                        <div className="border my-4 p-4">
                            <div>
                                {userState.resume?.url ? (
                                    <div>
                                        {userState.resume.fileName} <a className="ml-2 btn btn-xs btn-outline btn-success" href={`${BASE_URL}/uploads/${userState.resume.url}`} download>Download</a>
                                    </div>
                                ) : null}

                            </div>
                            <div className="flex items-end">
                                <FileInput label="Upload Resume" name="file" changeFn={(e) => handleSelectFile(e, "resume")} /> <Button type=" " classNames={"btn-outline btn-sm ml-2"} submitFn={uploadResume}>Upload</Button>

                            </div>
                        </div>
                    </div>


                    <div className="w-full h-[400px] overflow-y-scroll">
                        <div className="table-container">
                            <div className="table-header">
                                <div className="w-[50%]">
                                    <p className="text-lg font-semibold">Summary Reports</p>
                                </div>
                                <div className="w-[50%]">

                                </div>
                            </div>
                            <div className="table-body border mt-2">
                                {userState.summaryReport?.map((report, index) => (
                                    <>
                                        <div key={index} className="flex h-[55px] p-4">
                                            <div className="w-[50%] flex items-center">{report.fileName}</div>
                                            <div className="w-[50%] flex justify-end items-center gap-4">
                                                <a target="_blank" className="btn btn-xs btn-outline btn-success" href={`${BASE_URL}/uploads/${report.url}`} download>Download</a>
                                                <a className="btn btn-xs btn-outline btn-error" onClick={() => removeSummaryReport(report)}>Delete</a>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="btn-container w-full flex justify-end gap-2">
                        <Button type=" " classNames={"btn-error btn-sm text-white"}>Delete</Button>
                        <Button type=" " classNames={"btn-success btn-sm text-white"} submitFn={updateInternData}>Save</Button>
                    </div>

                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Upload Summary Report</h3>
                            <p>press esc to close</p>
                            <FileInput name="file" changeFn={(e) => handleSelectSummaryReport(e)} />
                            <div className="modal-action">
                                <form method="dialog" onSubmit={uploadSummaryReport}>
                                    <Button type=" " submitFn={e => handleCloseModal(e)} classNames={"btn-sm mr-2 rounded-none"} outline={"outline"} >Cancel</Button>
                                    <Button type=" " classNames={"btn-sm mr-2 rounded-none"} outline={"outline"} >Upload</Button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </>
            )}

            {/* </div> */}

        </div>
    )
}
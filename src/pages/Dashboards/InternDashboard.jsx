// login user 

import { useDispatch, useSelector } from "react-redux"
import { Button, InputText, Select, FileInput } from "../../components"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";
import { apiRequest, fileRequest } from "../../utils";
import { BASE_URL } from "../../CONSTANTS";
import Calendar from 'react-calendar';
import { login } from "../../store/slices/userSlice";



export const InternDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const [showStartCalendar, setShowStartCalendar] = useState(false)
    const [showEndCalendar, setShowEndCalendar] = useState(false)

    const [userState, setUserState] = useState(() => {
        const { _id, name, email, dept, internshipType, contactNo, referredBy, paid, feedBack, startDate, endDate, resume, summaryReport } = user
        return {
            _id,
            name,
            email,
            dept,
            internshipType,
            contactNo,
            referredBy,
            paid,
            feedBack,
            startDate,
            endDate,
            resume,
            summaryReport
        }
    })

    const uploadResume = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData();

        const file = userState.resume

        formData.append("title", file.name)
        formData.append("file", file);

        console.log(formData)

        const res = await fileRequest(`${BASE_URL}/interns/resume/${user._id}`, formData, "PATCH", "multipart/form-data")

        dispatch(login(res))
    }

    const handleSelectFile = (e, name) => {
        console.log(e.target.files, name)
        setUserState(state => {
            return {
                ...state,
                [name]: e.target.files[0]
            }
        })

    }

    const removeSummaryReport = async (summary) => {

       const res = await apiRequest(`${BASE_URL}/interns/summary-report/${userState._id}/${summary._id}`, null, "DELETE")
       dispatch(login(res))
    }

    const handleInputChange = (e, name) => {
        const value = e.target?.value || e.toString()

        console.log(value)
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

        const file = userState.summaryReport

        formData.append("title", file.name)
        formData.append("file", file);

        const res = await fileRequest(`${BASE_URL}/interns/summary-report/${user._id}`, formData, "PATCH", "multipart/form-data")
        // console.log(formData)
        dispatch(login(res))
    }


    const updateInternData = async () => {
        const { name, email, dept, internshipType, contactNo, referredBy, paid, feedBack, startDate, endDate } = userState

        const data = {
            name, email, dept, internshipType, contactNo, referredBy, paid, feedBack, startDate, endDate
        }

        const res = await apiRequest(`${BASE_URL}/interns/${userState._id}`, data, "PATCH")
        dispatch(login(res))
    }

    const getDisplayDate = date => {
        const dateArr = date?.split(" ")
        console.log(dateArr)
        return dateArr?.length > 4 ? `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}` : ""
    }

    const internshipTypeOptions = [{ label: "Residential", value: "residential" }, { label: "Non-Residential", value: "non-residential" }, { label: "One day visit", value: "onedayvisit" }]

    return (
        <div className="w-[90%] flex flex-col mx-auto justify-center items-center gap-4">
            <div className="w-full flex justify-between mt-4">
                <p className="text-xl font-semibold">Profile</p>
                <Button outline={"outline"} classNames={"rounded-none"} submitFn={() => document.getElementById('my_modal_1').showModal()}>
                    <FaPlus />    Upload Summary Report
                </Button>
            </div>

            {/* {userState?.summaryReport?.length && userState?.summaryReport?.map((report, i) => (
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{i+1}</h2>
                        <p>{report.name}</p>
                        <div className="card-actions justify-end">
                            <Button submitFn={() => downloadPdf(report.data?.data)}>Download</Button>
                        </div>
                    </div>
                </div>

            ))} */}

            {/* <div> */}
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
                    <Select placeholder={"Internship Type"} value={userState.internshipType} options={internshipTypeOptions} changeFn={(e) => handleInputChange(e, "internshipType")} />
                    {/* <InputText value={userState.internshipType} label={"Internship Type"} changeFn={(e) => handleInputChange(e,"internshipType")}/> */}
                    <InputText value={userState.referredBy} label={"Referred By"} changeFn={(e) => handleInputChange(e, "referredBy")} />
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="w-[50%] flex flex-col justify-center relative border">
                        <div className="flex justify-between items-center p-4">
                            <p>Start date</p>
                            <p>{getDisplayDate(userState.startDate)}</p>
                            <Button submitFn={() => setShowStartCalendar(state => !state)}><FaPlus /></Button>

                        </div>
                        {showStartCalendar ? (
                            <Calendar className={"absolute right-0 top-16"} value={userState.startDate} onChange={(e) => handleInputChange(e, "startDate")} />
                        ) : null}
                    </div>
                    <div className="w-[50%] flex flex-col justify-center relative border">
                        <div className="flex justify-between items-center p-4">
                            <p>End date</p>
                            <p>{getDisplayDate(userState.endDate)}</p>
                            <Button submitFn={() => setShowEndCalendar(state => !state)}><FaPlus /></Button>
                        </div>
                        {showEndCalendar ? (
                            <Calendar className={"absolute right-0 top-16"} value={userState.endDate} onChange={(e) => handleInputChange(e, "endDate")} />
                        ) : null}
                    </div>
                    {/* <InputText value={userState.startDate} label={"Start Date"} changeFn={(e) => handleInputChange(e,"startDate")}/>
                    <InputText value={userState.endDate} label={"End Date"} changeFn={(e) => handleInputChange(e,"endDate")}/> */}
                </div>

                {/* <Select value={userState.internshipType} /> */}

                <div className="border my-4 p-4">
                    <div>
                        {user.resume.url ? (
                            <div>
                                {user.resume.fileName} <a className="ml-2 btn btn-xs btn-outline btn-success" href={`${BASE_URL}/uploads/${user.resume.url}`} download>Download</a>
                            </div>
                        ) : null}

                    </div>
                    <div className="flex items-end">
                        <FileInput label="Upload Resume" name="file" changeFn={(e) => handleSelectFile(e, "resume")} /> <Button classNames={"btn-outline btn-sm ml-2"} submitFn={uploadResume}>Upload</Button>

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
                        {user.summaryReport?.map((report, index) => (
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
                <Button classNames={"btn-success btn-sm text-white"} submitFn={updateInternData}>Save</Button>
                <Button classNames={"btn-error btn-sm text-white"}>Delete</Button>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Upload Summary Report</h3>
                    <p>press esc to close</p>
                    <FileInput name="file" changeFn={(e) => handleSelectFile(e, "summaryReport")} />
                    <div className="modal-action">
                        <form method="dialog" onSubmit={uploadSummaryReport}>
                            <Button classNames={"btn-sm mr-2 rounded-none"} outline={"outline"} >Upload</Button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
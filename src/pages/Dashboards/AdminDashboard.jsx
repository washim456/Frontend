import { useEffect, useState } from "react"
import { apiRequest, getDisplayDate } from "../../utils"
import { BASE_URL } from "../../CONSTANTS"
import { useDispatch, useSelector } from "react-redux"
import { setAllInterns } from "../../store/slices/internSlice"
import { Link } from "react-router-dom"
import Calendar from 'react-calendar';
import { Button } from "../../components"
import { MdOutlineFilterAltOff } from "react-icons/md";


export const AdminDashboard = () => {


    const dispatch = useDispatch()

    const unfilteredInterns = useSelector(state => state.interns.interns)
    const searchText = useSelector(state => state.search.searchText)

    console.log("outside", unfilteredInterns)
    // let interns = unfilteredInterns.filter(ui => ui.name.startsWith(searchText) || ui.email.startsWith(searchText))

    // const [interns, setInterns] = useState(state => {
    //     if (unfilteredInterns.length) {
    //         return [...unfilteredInterns]
    //     } else return []
    // })

    const DAYINMS = 86400000 // milisecond in a day

    const [interns, setInterns] = useState([])

    console.log("interns", interns)

    const [startRange, setStartRange] = useState("")
    const [showStartRange, setShowStartRange] = useState(false)

    const [endRange, setEndRange] = useState("")
    const [showEndRange, setShowEndRange] = useState(false)


    useEffect(() => {
        const fetchInterns = async () => {
            const resp = await apiRequest(`${BASE_URL}/interns`)
            if (resp.error) {
                // show toast
                return
            }
            setInterns(resp)
            dispatch(setAllInterns(resp))

        }
        fetchInterns()
    }, [])

    useEffect(() => {
        if (!startRange && !endRange) return

        let startTime = startRange ? new Date(startRange).getTime() : null
        let endTime = endRange ? new Date(endRange).getTime() : null
        console.log("start", startTime)
        console.log("end", endTime)

        // only start time is set, filter from that
        if (startTime && !endTime) {
            const filtered = []

            unfilteredInterns.forEach(intern => {
                const internStartDate = intern.startDate ? new Date(intern.startDate) : null

                const days = (internStartDate - startTime) / DAYINMS
                console.log(days)
                if (days >= 0) {
                    filtered.push(intern)
                }
            })

            setInterns(() => [...filtered])

        } else if (!startTime && endTime) {
            // only endTime is set, show interns before that
            const filtered = []

            unfilteredInterns.forEach(intern => {
                const internStartDate = intern.startDate ? new Date(intern.startDate) : null

                const days = (internStartDate - endTime) / DAYINMS

                console.log("days", days)
                if (days <= 0) {
                    filtered.push(intern)
                }
            })

            setInterns(() => [...filtered])

        } else if( startTime && endTime){
            console.log("both set")
            const filtered = []

            unfilteredInterns.forEach(intern => {
                const internStartDate = intern.startDate ? new Date(intern.startDate) : null

                const startDays = (internStartDate - startTime) / DAYINMS
                const endDays = (internStartDate - endTime) / DAYINMS

                if(startDays >= 0 && endDays <= 0){
                    filtered.push(intern)
                }

            })

            setInterns(() => [...filtered])
        }
    }, [startRange, endRange])

    useEffect(() => {
        if(!searchText){
            setInterns(unfilteredInterns)
        }else{
            setInterns(state => state.filter(ui => ui.name.startsWith(searchText) || ui.email.startsWith(searchText)))
        }

    }, [searchText])

    return (
        <div className="w-[90%] mx-auto ">
            <div className="flex justify-between items-center">
                <p className="text-lg font-bold mt-4">Interns</p>
                <div className="flex gap-4 items-center">
                    {startRange || endRange ? (
                        <>
                            <p className="text-sm font-semibold">{getDisplayDate(startRange) || "*"}</p>
                            <p className="text-sm font-semibold">⸻</p>
                            <p className="text-sm font-semibold">{getDisplayDate(endRange) || "*"}</p>
                        </>
                    ) : null}
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-xs">Filter by dates</p>
                    <div className="relative">
                        <Button submitFn={() => setShowStartRange(state => !state)} classNames={"btn-sm btn-outline btn-wide"}>{startRange ? getDisplayDate(startRange) : "Starting Range"}</Button>
                        {showStartRange ? (
                            <Calendar className={"absolute z-10"} value={startRange} onChange={e => setStartRange(e.toString(), "start")} />

                        ) : null}
                    </div>
                    <div className="relative">
                        <Button submitFn={() => setShowEndRange(state => !state)} classNames={"btn-sm btn-outline"}>{endRange ? getDisplayDate(endRange) : "Ending Range"}</Button>
                        {showEndRange ? (
                            <Calendar className={"absolute z-10"} value={endRange} onChange={e => setEndRange(e.toString(), "end")} />

                        ) : null}
                    </div>
                    {startRange || endRange ? (
                        <Button submitFn={() => { setStartRange(""); setEndRange(""); setInterns(unfilteredInterns)}} type=" " classNames={"btn-xs btn-outline"}><MdOutlineFilterAltOff /></Button>
                    ) : null}
                </div>
            </div>
            <hr className="mt-10" />
            <table className="table overflow-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        {/* <th>End Date</th> */}
                    </tr>
                </thead>
                <tbody>
                    {interns.map((intern, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td><Link to={`/interns/${intern._id}`}>{intern.name}</Link></td>
                            <td>{intern.email}</td>
                            <td>{intern.dept || "N/A"}</td>
                            {/* <td>{intern.access.status}</td> */}
                            <td>{getDisplayDate(intern.startDate) || "N/A"}</td>
                            <td>{getDisplayDate(intern.endDate) || "N/A"}</td>
                            {/* <td>{intern.endDate}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
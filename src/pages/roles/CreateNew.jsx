import { useEffect, useState } from "react"
import { Button, InputText } from "../../components"
import { apiRequest } from "../../utils"
import { BASE_URL } from "../../CONSTANTS"
import toast from "react-hot-toast"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { addOne } from "../../store/slices/internSlice"
import { useNavigate } from "react-router-dom"

export const CreateNew = () => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // only admin can access this page
        if(user.role === "intern"){
            navigate("/")
        }
    },[])

    const initialState = {
        name: "",
        email: "",
        password: "",
    }

    const [data, setData] = useState(initialState)


    const [loading, setLoading] = useState(false)

    const handleInputChange = (e, name) => {
        const { value } = e.target

        setData(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }


    const handleCreateAccount = async () => {
        
        if (!data.name) {
            toast.error("Please enter a name")
            return
        }

        if (!data.email) {
            toast.error("Please enter a email")
            return
        }

        if (!data.password) {
            toast.error("Please enter a password")
            return
        }

        const role = window.location.pathname.split("/")[1]
        const sure = window.confirm(`This will add a new ${role}, Are you sure ?`)

        if(!sure) return

        
        const body = { ...data, role }
        try {
            setLoading(true)
            const res = await apiRequest(`${BASE_URL}/signup`, body, "POST")
            if (res.error) {
                toast.error(res.message)
                setLoading(false)
                return
            }

            if (role === "intern") {
                dispatch(addOne(res))
            }

            toast.success(`New ${role} added successfully`)
            setLoading(false)
            setData(initialState)
            // add intern to store

        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
            setLoading(false)
        }

    }

    return (
        <div className={`w-[80%] pt-[80px] ml-[18%] flex flex-col gap-4 ${user.role === "intern" ? "close" : ""}`}>
            {loading ? (
                <div className="flex h-[80vh] justify-center items-center">
                    <AiOutlineLoading3Quarters color="oklch(var(--p))" fontSize={"48px"} className="animate-spin" />
                </div>
            ) : (
                <>
                    <InputText value={data.name} label={"Name"} changeFn={e => handleInputChange(e, "name")} />
                    <InputText value={data.email} label={"Email"} changeFn={e => handleInputChange(e, "email")} />
                    <InputText value={data.password} label={"Password"} changeFn={e => handleInputChange(e, "password")} />
                    <Button submitFn={handleCreateAccount}>Add {`${window.location.pathname.split("/")[1]}`}</Button>
                </>
            )}
        </div>
    )
}
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ProfilePic from "/profile.webp"
import { Button, FileInput, InputText, CustomModal } from "../components"
import { LuUpload } from "react-icons/lu";
import { apiRequest, fileRequest } from "../utils";
import toast from "react-hot-toast";
import { BASE_URL } from "../CONSTANTS";
import { login, logout } from "../store/slices/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


export const Profile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    console.log("user", user)

    const [data, setData] = useState({})

    console.log("data", data)
    const [image, setImage] = useState()

    useEffect(() => {
        setData(state => {
            return {
                ...state,
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                role: user.role
            }
        })
    }, [user])


    const [loading, setLoading] = useState(false)

    const [loadingImage, setLoadingImage] = useState(false)

    const [modal, stepModal] = useState(true)

    const handleInputChange = (e, name) => {
        const { value } = e.target

        setData(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }

    const handleUploadPicture = async e => {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData();

        const file = image
        formData.append("title", file.name)
        formData.append("file", file);

        if (!file) {
            toast.error("Please select a file")
            return
        }

        try {
            setLoadingImage(true)
            const res = await fileRequest(`${BASE_URL}/profile/pic/${data._id}/${data.role}`, formData, "PATCH", "multipart/form-data")
            // dispatch(login(res)) update interns or user
            if (res.error) {
                toast.error(res.message)
                setLoadingImage(false)
                return
            }

            dispatch(login(res))
            setLoadingImage(false)

        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
            setLoadingImage(false)
        }


    }

    const handleUpadeUser = async () => {
        try {

            setLoading(true)
            const res = await apiRequest(`${BASE_URL}/profile/${data._id}`, data, "PATCH")
            if (res.error) {
                toast.error(res.message)
                return
            }

            dispatch(login(res))
            toast.success("Updated successfully")
            setLoading(false)
        } catch (err) {
            toast.error("Something went wrong")
            setLoading(false)
        }
    }

    const handleRemoveUser = async (e) => {
        const sure = window.confirm("This will delete your account permanently. Are you sure?")
       
        if(sure){
            try{
                const res = await apiRequest(`${BASE_URL}/profile/${data._id}/${data.role}`,null, "DELETE")
                console.log(res)

                if(res.error){
                    toast.error(res.message)
                }

                toast.success("Your account has been deleted")

                localStorage.removeItem("token")
                dispatch(logout())
                
                navigate("/")
                navigate(0)
                // logout user, delete token, refresh
            }catch(err){
                toast.error("Something went wrong")
            }
        }
    }


    return (
        <div className={`w-[80%] pt-[80px] ml-[18%] h-[80vh] flex mx-auto justify-center items-center gap-4 ${user.role === "intern" ? "close" : ""}`}>
            {loading ? (
                <div className="flex h-full justify-center items-center">
                    <AiOutlineLoading3Quarters color="oklch(var(--p))" fontSize={"48px"} className="animate-spin" />
                </div>
            ) : (
                <>
                    <div className="avatar flex justify-center">
                        <div className="w-[350px] rounded">
                            {loadingImage ? (
                                <div className="flex h-full justify-center items-center">
                                    <AiOutlineLoading3Quarters color="oklch(var(--p))" fontSize={"48px"} className="animate-spin" />
                                </div>
                            ) : (
                                <img src={data.profilePic?.url ? `${BASE_URL}/uploads/${data.profilePic?.url}` : ProfilePic} />
                            )}
                        </div>
                    </div>
                    <div className="w-[40%] flex flex-col gap-4 ml-4">
                        <InputText label={"Name"} value={data.name} changeFn={(e) => handleInputChange(e, "name")} />
                        <InputText label={"Email"} value={data.email} changeFn={(e) => handleInputChange(e, "email")} />
                        <div className="flex items-end gap-2">
                            <FileInput accept=".png, .jpg, .jpeg" label="Select your profile picture" changeFn={e => setImage(e.target.files[0])} />
                            <Button type=" " classNames={"btn-outline btn-sm btn-success"} submitFn={handleUploadPicture}><LuUpload /></Button>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button type=" " submitFn={handleUpadeUser} classNames={"btn-success text-white btn-sm"}>Update</Button>
                            <Button type=" " submitFn={handleRemoveUser} classNames={"btn-error text-white btn-sm"}>Delete Account</Button>
                        </div>
                    </div>
                </>

            )}
            {/* <CustomModal isOpen={modal} closeFn={handleModalClose} >saafgagf</CustomModal> */}
        </div>
    )
}
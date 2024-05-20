import { useState } from "react";
import { InputText, Button, Select } from "../components";
import { BASE_URL } from "../CONSTANTS";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/slices/userSlice";
import { clearOrg } from "../store/slices/orgSlice";
import { apiRequest } from "../utils";
import toast from "react-hot-toast";

export const SignupPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        name: "",
        email: "",
        password: "",
        role: "intern",
        Dept: ""
    }

    const [credentials, setCredentials] = useState(initialState)


    const handleInputChange = (e, name) => {
        console.log(e)
        const { value } = e.target
        setCredentials(cred => ({
            ...cred,
            [name]: value
        }))
    }

    const handleSignup = async (role) => {
        try {
            credentials.role = role

            if(!credentials.name){
                toast("Please enter your name")
                return
            }

            if(!credentials.email){
                toast("Please enter your email")
                return
            }

            if(!credentials.password){
                toast("Please enter your password")
                return
            }

            const data = await apiRequest(`${BASE_URL}/signup`, credentials, "POST")

            if(data.error){
                toast.error(data.message)
            }

            const { user, token } = data

            // store the token in local storage
            localStorage.setItem("token", token)
            // store user data in redux
            // dispatch(clearOrg())
            dispatch(login(user))
            // navigate user to home screen
            toast.success("Account created successfully")
            navigate("/")

        } catch (e) {
            toast.error("Something went wrong")
        }

    }

    return (
        <div className="w-full mx-auto h-[80%] flex flex-col justify-center items-center gap-2">
            <div className="w-[40%]">
                <InputText classNames={"w-full mt-4"} name="name" type="text" placeholder="name" value={credentials.name} changeFn={e => handleInputChange(e, "name")} />
                <InputText classNames={"w-full mt-4"} name="email" type="email" placeholder="Email" value={credentials.email} changeFn={e => handleInputChange(e, "email")} />
                <InputText classNames={"w-full mt-4"} name="password" type="password" placeholder="Password" value={credentials.password} changeFn={e => handleInputChange(e, "password")} />

                <div className="flex justify-between mt-4">
                    <Button submitFn={() => handleSignup("intern")} classNames={` w-[49%] rounded-none ${credentials.role === "intern" ? "" : "btn-outline"}`} variant="primary">Signup as Intern</Button>
                    <Button submitFn={() => handleSignup("admin")} classNames={` w-[49%] rounded-none ${credentials.role === "admin" ? "" : "btn-outline"}`} variant="primary">Signup as Admin</Button>
                </div>
            </div>
            <div>
                Already have an account? <Link to="/login" className="text-accent">login here</Link>
            </div>
        </div>
    )

}
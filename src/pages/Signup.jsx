import { useState } from "react";
import { InputText, Button, Select } from "../components";
import { BASE_URL } from "../CONSTANTS";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/slices/userSlice";
import { clearOrg } from "../store/slices/orgSlice";
import { apiRequest } from "../utils";

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

    const updateRole = async role => {
        setCredentials(state => {
            return {
                ...state,
                role
            }
        })
       await handleSignup()
    }

    const handleSignup = async () => {
        try {
            const data = await apiRequest(`${BASE_URL}/signup`, credentials, "POST")

            const { user, token } = data

            // store the token in local storage
            localStorage.setItem("token", token)
            // store user data in redux
            dispatch(clearOrg())
            dispatch(login(user))
            // navigate user to home screen
            navigate("/")

        } catch (e) {
            window.alert(e.message)
        }

    }

    console.log("state", credentials)

    return (
        <div className="w-[40%] mx-auto h-[80%] flex flex-col justify-center items-center gap-2">
            <div>
                <InputText classNames={"w-full mt-4"} name="name" type="text" placeholder="name" value={credentials.name} changeFn={e => handleInputChange(e, "name")} />
                <InputText classNames={"w-full mt-4"} name="email" type="email" placeholder="Email" value={credentials.email} changeFn={e => handleInputChange(e, "email")} />
                <InputText classNames={"w-full mt-4"} name="password" type="password" placeholder="Password" value={credentials.password} changeFn={e => handleInputChange(e, "password")} />

                <div className="flex justify-between mt-4">
                    <Button submitFn={() => updateRole("intern")} classNames={` w-[49%] rounded-none ${credentials.role === "intern" ? "" : "btn-outline"}`} variant="primary">Signup as Intern</Button>
                    <Button submitFn={() => updateRole("admin")} classNames={` w-[49%] rounded-none ${credentials.role === "admin" ? "" : "btn-outline"}`} variant="primary">Signup as Admin</Button>
                </div>
            </div>
            <div>
                Already have an account? <Link to="/login" className="text-accent">login here</Link>
            </div>
        </div>
    )

}
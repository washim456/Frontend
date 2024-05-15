import { useState } from "react";
import { InputText, Button, Toast } from "../components";

import { BASE_URL } from "../CONSTANTS";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils";

export const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        email: "",
        password: "",
        role: "admin"
    }

    const [credentials, setCredentials] = useState(initialState)


    const handleInputChange = (e, name) => {
        const { value } = e.target
        setCredentials(cred => ({
            ...cred,
            [name]: value
        }))
    }

    const updateRole = role => {
        setCredentials(state => {
            return {
                ...state,
                role
            }
        })
        handleLogin()
    }

    const handleLogin = async (role) => {
        try {
            credentials.role = role
            console.log(credentials)
           const data = await apiRequest(`${BASE_URL}/login`, credentials, "POST")

            const { user, token } = data

            // store the token in local storage
            localStorage.setItem("token", token)
            // store user data in redux
            dispatch(login(user))
            // navigate user to home screen
            navigate("/")

        } catch (e) {
            window.alert(data.message)
        }

    }

    console.log("state", credentials)

    return (
        <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2">
            <div>
                <InputText classNames={"w-full mt-4"} name="email" type="email" placeholder="Email" value={credentials.email} changeFn={e => handleInputChange(e, "email")} />
                <InputText classNames={"mt-4"} name="password" type="password" placeholder="Password" value={credentials.password} changeFn={e => handleInputChange(e, "password")} />
                <div className="flex justify-between mt-4">
                    <Button submitFn={() => handleLogin("intern")} classNames={` w-[49%] rounded-none ${credentials.role === "intern" ? "" : "btn-outline"}`} variant="primary">Login as Intern</Button>
                    <Button submitFn={() => handleLogin("admin")} classNames={` w-[49%] rounded-none ${credentials.role === "admin" ? "" : "btn-outline"}`} variant="primary">Login as Admin</Button>
                </div>

            </div>
            <div>
                New here? <Link to="/signup" className="text-accent">Create your account</Link>
            </div>
        </div>

    )

}

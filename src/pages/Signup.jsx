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
        role: "",
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

    const handleSignup = async () => {
        try {
            // const resp = await fetch(`${BASE_URL}/signup`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(credentials)
            // })

            // // console.log(await resp.json())

            // const jsonResp = await resp.json()

            // if (resp.status > 299) {
            //     throw new Error(jsonResp)
            // }

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
        <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2" >
            <p className="text-2xl font-semibold">Signup</p>
            <InputText name="name" type="text" placeholder="name" value={credentials.name} changeFn={e => handleInputChange(e, "name")} />
            <InputText name="email" type="email" placeholder="Email" value={credentials.email} changeFn={e => handleInputChange(e, "email")} />
            <InputText name="password" type="password" placeholder="Password" value={credentials.password} changeFn={e => handleInputChange(e, "password")} />
            <Select name="role" placeholder="Select your role" options={[{label : "Admin", value: "admin"}, {label: "Intern", value: "intern"}]} value={credentials.role} changeFn={e => handleInputChange(e, "role")}/>
            {credentials.role === "Admin" ? "You'll have to wait for the approval to get admin access" : null}
            
            <div className="">
                <Button submitFn={handleSignup}>Signup</Button>
            </div>
            <div>
                Already have an account? <Link to="/login" className="text-accent">login here</Link>
            </div>
        </div>
    )

}
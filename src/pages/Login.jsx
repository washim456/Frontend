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
        email : "",
        password : ""
    }

    const [credentials, setCredentials] = useState(initialState)


    const handleInputChange = (e, name) => {
        const { value } = e.target
        setCredentials(cred => ({
            ...cred,
            [name]: value
        }))
    }

    const handleLogin = async () => {
        try{
            // const resp = await fetch(`${BASE_URL}/login`,{
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(credentials)
            // })
            
            // const data = await resp.json()
            
            // if(resp.status > 299) {
            //     throw new Error(data)
            // }

            const data = await apiRequest(`${BASE_URL}/login`, credentials, "POST")


            const { user, token } = data

            // store the token in local storage
            localStorage.setItem("token", token)
            // store user data in redux
            dispatch(login(user))
            // navigate user to home screen
            navigate("/")

        }catch(e){
            window.alert(e.message)
        }
       
    }

    console.log("state", credentials)

    return (
        <>
            <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2" >
                <p className="text-2xl font-semibold">Login</p>
                <InputText name="email" type="email" placeholder="Email" value={credentials.email} changeFn={e => handleInputChange(e, "email")}/>
                <InputText name="password" type="password" placeholder="Password" value={credentials.password} changeFn={e => handleInputChange(e, "password")}/>
                <Button submitFn={handleLogin}>Login</Button>
                <div>
                    New here? <Link to="/signup" className="text-accent">Create your account</Link>
                </div>
            </div>
        </>
    )

}
export const getToken = () => {
    return localStorage.getItem("token")
}


export const apiRequest = async (url, data, method = "GET") => {
    // const jsonData = JSON.stringify({ email : "ajay5@nayak.com", password: "pass"})
    // console.log("jsonData", jsonData)

    const reqBody = {
        method,
        headers: {
            token: getToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    if (data) {
        reqBody.body = JSON.stringify(data)
    }

    const resp = await fetch(url, reqBody)

    if (resp.status > 299) {
        throw new Error(resp.statusText)
    }

    return await resp.json()
}
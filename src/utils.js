export const getToken = () => {
    return localStorage.getItem("token")
}


export const apiRequest = async (url, data, method = "GET", contentType = "application/json") => {
    // const jsonData = JSON.stringify({ email : "ajay5@nayak.com", password: "pass"})
    // console.log("jsonData", jsonData)

    const reqBody = {
        method,
        headers: {
            token: getToken(),
            'Accept': 'application/json',
            'Content-Type': contentType,
        }
    }

    if (data) {
        reqBody.body = JSON.stringify(data)
    }

    const resp = await fetch(url, reqBody)

    return await resp?.json()
}

export const fileRequest = async(url, data, method = "GET", contentType = "multipart/form-data") => {
    const reqBody = {
        method,
        headers: {
            token: getToken(),
           
        },
        body: data
    }

    const resp = await fetch(url, reqBody)
    return await resp?.json()
}

export const hasAccess = (requiredAccessLevel, currentLevel) => {
    const levels = {
        "guest": -1,
        "intern": 0,
        "admin":1,
        "superadmin":2
    }

    // current level should be equal or grater than required level

    if(levels[currentLevel] >= levels[requiredAccessLevel]){
        return true
    }else{
        return false
    }
}

export const getDisplayDate = date => {
    const dateArr = date?.split(" ")
    return dateArr?.length > 4 ? `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}` : ""
}
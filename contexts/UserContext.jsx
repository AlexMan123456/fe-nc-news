import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

function UserProvider(props){
    const {children} = props
    const signedInUserInLocalStorage = localStorage.getItem("signedInUser")
    const [signedInUser, setSignedInUser] = useState(signedInUserInLocalStorage ?? "")
    useEffect(() => {
        signedInUserInLocalStorage ? setSignedInUser(signedInUserInLocalStorage) : setSignedInUser("")
    }, [signedInUserInLocalStorage])
    return <UserContext.Provider value={{signedInUser, setSignedInUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}
import { createContext, useState } from "react";

const UserContext = createContext()

function UserProvider({children}){
    const [signedInUser, setSignedInUser] = useState("")
    return <UserContext.Provider value={{signedInUser, setSignedInUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}
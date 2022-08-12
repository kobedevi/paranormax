import { createContext, useContext, useState } from "react";
import App from '../App/App';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from "../../core/routing";
import LoginPage from "../OnBoarding/Login/LoginPage";
import RegisterPage from "../OnBoarding/Register/RegisterPage";
import storage from "../../core/storage";

export const AuthContext = createContext();
const AuthContainer = () => {

    const [user, setUser] = useState(storage.getUser());

    const updateUser = (updatedUser) => {
        storage.storeUser(updatedUser);
        if(updatedUser) {
            storage.storeUserVariableData({'email': updatedUser.user.email, 'userName': updatedUser.user.username});
            storage.storeJWT(updatedUser.jwt);
        } else {
            storage.storeUserVariableData(null);
            storage.storeJWT(null);
        }
        setUser(updatedUser);
    }

    const logout = () => {
        updateUser(null);
    }

    if(user) {
        return (
            <AuthContext.Provider value={{user, setUser: updateUser, logout}}>
                <App/>
            </AuthContext.Provider>
        )
    }

    return (
        <Switch>
            <Route path={Routes.Login}>
                <LoginPage setUser={updateUser}/>
            </Route>
            <Route path={Routes.Register} >
                <RegisterPage setUser={updateUser}/>
            </Route>
            <Redirect to={Routes.Login} />
        </Switch>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export {
    useAuth,
}

export default AuthContainer;
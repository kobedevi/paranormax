import {useContext} from "react";
import {AuthContext} from "../../components/Auth/AuthContainer";

// get the current auth state for user login, register, logout
export const useAuth = () => useContext(AuthContext);
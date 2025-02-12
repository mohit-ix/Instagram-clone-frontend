import { redirect } from "react-router-dom";

//function to retreive accessToken from local storage
export function getAuth() {
    const token = localStorage.getItem("accessToken");
    return token;
}

export function tokenLoader() {
    return getAuth();
}

//function to authenticate and redirect to /login if not authenticated
export function checkAuthLoader() {
    const token = getAuth();

    if(token === null) {
        return redirect("/login");
    }

    return null;
}
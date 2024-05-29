import { Outlet } from "react-router-dom";
import { Navbar, Sidenav } from "./components";
import { useSelector } from "react-redux";

export default function NavbarLayout () {

    const user = useSelector(state => state.user.user)

    return (
        <div>
            {user.role === "admin" && (
                <Sidenav />
            )}
            <div>
                <Outlet />
            </div>
        </div>
    )
}
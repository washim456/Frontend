import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../store/slices/userSlice"
import avatar from "../assets/avatar.svg"
import { hasAccess } from "../utils"

export const Navbar = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useSelector(state => state.user.user)

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div className="navbar bg-primary">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-white">IMS</Link>
                <div>
                    {/* <Link to="/admins" className="btn btn-ghost text-xs text-white hover:cursor-pointer">Admins</Link>
                    <Link to="/interns" className="btn btn-ghost text-xs text-white hover:cursor-pointer">Interns</Link> */}
                    {hasAccess("admin", user?.access?.role || "guest") ? (
                        <Link to="/pending" className="btn btn-ghost text-xs text-white">Pending Requests</Link>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {user ? (
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <div className="dropdown dropdown-end mr-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10">
                                {/* <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                                <img src={avatar} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to={`/users/${user._id}`} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            ) : (null)}

        </div>
    )
}
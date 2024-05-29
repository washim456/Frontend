import { GrUserAdmin } from "react-icons/gr";
import { FaUserGraduate } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { RiDashboardFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Sidenav = () => {

    const [activeState, setActive] = useState("Dashboard")

    const pages = {
        "Dashboard" : "/",
        "Add new admin" : "/admin/create",
       "Add new intern" : "/intern/create",
       "Summary Reports" : "/summary"
    }

    const icon = {
        "Dashboard" : <RiDashboardFill />,
        "Add new admin" : <GrUserAdmin />,
        "Add new intern" : <FaUserGraduate />,
        "Summary Reports" : <TbReportSearch/>

    }

    return (
        <div className="side-nav mt-[65px] shadow-xl fixed bg-base-100 flex flex-col h-full w-[15%] z-10 border">
            {Object.keys(pages).map(name => (
                <>
                    <Link onClick={() => setActive(name)} to={pages[name]} className={`transition text-md flex hover:cursor-pointer hover:bg-base-200 items-center px-8 py-3 ${activeState === name ? "active" : ""}`}>
                        {icon[name]}
                        <p className="ml-2">{name}</p>
                    </Link>
                <hr />
                </>
            ))}
        </div>
    )
}
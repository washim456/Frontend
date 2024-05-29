import { useSelector } from "react-redux"
import { TbError404Off } from "react-icons/tb";

export const NotFound = () => {
    const user = useSelector(state => state.user.user)

    return (
        <div className={`pt-[80px] flex flex-col items-center gap-4 ${user?.role === "intern" ? "close" : ""}`}>
           <TbError404Off fontSize={"228px"} color="oklch(var(--a))"/>
           <p className="font-semibold text-2xl">Nothing here</p>
        </div>
    )
}
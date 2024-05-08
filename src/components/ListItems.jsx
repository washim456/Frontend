import { useNavigate } from "react-router-dom";

export const ListItems = ({ title, data }) => {

    const navigate = useNavigate()

    const navigateToUser = id => {
        navigate(`/users/${id}`)
    }

    return (
        <div className="mt-9">
            {data.length ? (
                <>
                    <p className="text-xl">
                        {title}
                    </p>
                    <div className="flex justify-start flex-wrap items-center w-full">
                        {data.map((item, i) => (
                            <div key={i} className="card w-96 bg-base-100 shadow-xl mr-5">
                                <div className="card-body">
                                    <h2 className="card-title capitalize">{item.name}</h2>
                                    <p>{item.email}</p>
                                    {item.access.status === "pending" ? (
                                    <div className="flex items-center">
                                        <div className={`badge badge-accent badge-xs`}></div>
                                        <span className="ml-2">{item.access.status}</span>
                                    </div>

                                    ) : null}
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={() => navigateToUser(item._id)}>Manage</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    )
}
import { useSelector } from "react-redux"
import { ListItems } from "./ListItems"

export const Lists = () => {
    const organisation = useSelector(state => state.org.org)
    return (
        <>
        {organisation ? (
            <div className="w-[90%] flex flex-col justify-between items-start mx-auto">

                <ListItems title="Owners" data={organisation.superadmins} />
                <ListItems title="Admins" data={organisation.admins} />
                <ListItems title="Interns" data={organisation.interns} />

                {/* <div>
                    <p>
                        Owners
                    </p>
                    {organisation.superadmins.map(sa => (
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{sa.name}</h2>
                                <p>{sa.email}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Manage</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
    
                <div>
                    <p>
                        Admins
                    </p>
                    {organisation.admins.map(sa => (
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{sa.name}</h2>
                                <p>{sa.email}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Manage</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
    
                <div>
                    <p>
                        Interns
                    </p>
                    {organisation.interns.map(sa => (
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{sa.name}</h2>
                                <p>{sa.email}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Manage</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>

        ) : null}
        </>
    )
}
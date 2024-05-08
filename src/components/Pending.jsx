import { Button } from "./form"

export const Pending = ({ data }) => {
    return (
        <>
            {
                data.map(user => (
                    <>
                        <div className="flex bg-base-100 m-3 p-3 justify-between items-center">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.access.role}</p>
                            <div className="flex justify-around w-[15%]">
                                <Button variant="success" type="">Approve</Button>
                                <Button variant="error" type="">Reject</Button>
                            </div>
                        </div>
                    </>
                ))
            }
        </>
    )
}
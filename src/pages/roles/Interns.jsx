import { useSelector } from "react-redux"

export const InternPage = () => {

    const interns = useSelector(state => state.org.org.interns)
    console.log(interns)

    return (
        <div className="w-[90%] mx-auto overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern, index )=> (
                <tr key={index}> 
                    <th>{index + 1}</th>
                    <td>{intern.name}</td>
                    <td>{intern.email}</td>
                    <td>{intern.dept}</td>
                    <td>{intern.access.status}</td>
                    <td>{intern.startDate}</td>
                    <td>{intern.endDate}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function LeaveHistory() {

  const [leaves, setLeaves] =
    useState([]);

  useEffect(() => {

    loadLeaveHistory();

  }, []);

  const loadLeaveHistory =
  async () => {

    try {

      const response =
      await axios.get(
        "http://localhost:5000/api/leaves/history",
        {
          headers: {
            Authorization:
            `Bearer ${
              localStorage.getItem(
                "token"
              )
            }`
          }
        }
      );

      setLeaves(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4">
          Leave History
        </h2>

        <table className="table table-bordered shadow">

          <thead className="table-dark">

            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {
              leaves.length > 0 ?

              leaves.map((leave) => (

                <tr key={leave.id}>

                  <td>{leave.leave_type}</td>

                  <td>
                    {new Date(
                      leave.start_date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(
                      leave.end_date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {leave.total_days}
                  </td>

                  <td>

                    <span
                      className={
                        leave.status ===
                        "Approved"

                        ? "badge bg-success"

                        : leave.status ===
                          "Rejected"

                        ? "badge bg-danger"

                        : "badge bg-warning text-dark"
                      }
                    >

                      {leave.status}

                    </span>

                  </td>

                </tr>

              ))

              :

              (
                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Leave Records Found
                  </td>

                </tr>
              )

            }

          </tbody>

        </table>

      </div>

    </>
  );
}

export default LeaveHistory;
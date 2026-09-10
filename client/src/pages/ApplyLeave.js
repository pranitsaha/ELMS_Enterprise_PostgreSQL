import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ApplyLeave() {

  const [leaveType,
    setLeaveType] = useState("");

  const [startDate,
    setStartDate] = useState("");

  const [endDate,
    setEndDate] = useState("");

  const [reason,
    setReason] = useState("");

  const [message,
    setMessage] = useState("");

  const submitLeave =
  async (e) => {

    e.preventDefault();

    try {

      const response =
      await axios.post(

        "http://localhost:5000/api/leaves/apply",

        {
          leaveType,
          startDate,
          endDate,
          reason
        },

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

      setMessage(
        response.data.message
      );

    } catch (error) {

      setMessage(
        "Failed To Apply Leave"
      );

    }

  };

  return (

    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-8">

            <div className="card shadow">

              <div className="card-body">

                <h2
                className="text-center mb-4"
                >
                  Apply Leave
                </h2>

                <form
                onSubmit={submitLeave}
                >

                  <div className="mb-3">

                    <label>
                      Leave Type
                    </label>

                    <select
                      className="form-control"
                      value={leaveType}
                      onChange={(e)=>
                      setLeaveType(
                        e.target.value
                      )}
                    >

                      <option value="">
                        Select Leave
                      </option>

                      <option>
                        Casual Leave
                      </option>

                      <option>
                        Sick Leave
                      </option>

                      <option>
                        Annual Leave
                      </option>

                    </select>

                  </div>

                  <div className="mb-3">

                    <label>
                      Start Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e)=>
                      setStartDate(
                        e.target.value
                      )}
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      End Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e)=>
                      setEndDate(
                        e.target.value
                      )}
                    />

                  </div>

                  <div className="mb-3">

                    <label>
                      Reason
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      value={reason}
                      onChange={(e)=>
                      setReason(
                        e.target.value
                      )}
                    />

                  </div>

                  <button
                    type="submit"
                    className=
                    "btn btn-primary w-100"
                  >
                    Submit Leave Request
                  </button>

                </form>

                <p
                  className=
                  "text-center mt-3"
                >
                  {message}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );
}

export default ApplyLeave;
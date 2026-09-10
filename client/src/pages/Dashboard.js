import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const role =
    localStorage.getItem(
    "role"
  );


  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h1 className="text-center mb-5">
          Employee Dashboard
        </h1>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white shadow">
              <div className="card-body text-center">
                <h5>Total Leave</h5>
                <h1>{dashboard.totalLeave || 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white shadow">
              <div className="card-body text-center">
                <h5>Used Leave</h5>
                <h1>{dashboard.usedLeave || 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning shadow">
              <div className="card-body text-center">
                <h5>Available Leave</h5>
                <h1>{dashboard.availableLeave || 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-danger text-white shadow">
              <div className="card-body text-center">
                <h5>Pending Requests</h5>
                <h1>{dashboard.pendingLeave || 0}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="card shadow">
            <div className="card-body">
              <h4>Welcome to Employee Leave Management System</h4>

              <p>
                Here you can:
              </p>

              <ul>
                <li>Apply for Leave</li>
                <li>Track Leave Status</li>
                <li>Check Leave Balance</li>
                <li>View Leave History</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">

  <button
    className="btn btn-primary btn-lg"
    onClick={() =>
      navigate("/apply-leave")
    }
  >
    Apply Leave
  </button>
  <button
    className="btn btn-secondary btn-lg ms-3"
    onClick={() =>
      navigate("/leave-history")
    }
  >
    Leave History
  </button>
  {role === "Admin" && (
    <button
      className="btn btn-danger btn-lg ms-3"
      onClick={() =>
        navigate("/admin-approvals")
      }
    >
      Approve Leaves
    </button>
  )}

  {
  role === "Admin" && (
    <button
      className="btn btn-success btn-lg ms-3"
      onClick={() =>
        navigate("/reports")
      }
    >
      Reports
    </button>
  )}


  <h1 className="text-center mb-5">
      Employee Dashboard
  </h1>
  <h4 className="text-center">
      Role: {role}
  </h4>
</div>
    </>
    
  );
}

export default Dashboard;
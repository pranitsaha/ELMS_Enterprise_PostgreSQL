import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Reports() {

  const [report, setReport] =
    useState({});

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {

    try {

      const response =
      await axios.get(
        "http://localhost:5000/api/reports",
        {
          headers: {
            Authorization:
            `Bearer ${
              localStorage.getItem("token")
            }`
          }
        }
      );

      setReport(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="text-center mb-4">
          Admin Reports
        </h2>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h5>Total Employees</h5>
                <h1>{report.employees || 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h5>Approved</h5>
                <h1>{report.approved || 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning">
              <div className="card-body text-center">
                <h5>Pending</h5>
                <h1>{report.pending || 0}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-danger text-white">
              <div className="card-body text-center">
                <h5>Rejected</h5>
                <h1>{report.rejected || 0}</h1>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Reports;
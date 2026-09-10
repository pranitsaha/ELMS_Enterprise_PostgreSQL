import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [employeeId, setEmployeeId] =
    useState("");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [message, setMessage] =
    useState("");

  const registerUser = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          employeeId,
          name,
          email,
          password,
          department
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f9"
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)"
        }}
      >

        <h2 className="text-center mb-4">
          Employee Registration
        </h2>

        <form onSubmit={registerUser}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(e.target.value)
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          />

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          {message}
        </p>

      </div>
    </div>
  );
}

export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");
    

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
      await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      navigate("/dashboard");

      setMessage(
        "Login Successful"
      );

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (
    <div
      style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        background:"#f4f6f9"
      }}
    >
      <div
        style={{
          width:"400px",
          padding:"30px",
          background:"white",
          borderRadius:"10px",
          boxShadow:
          "0 0 15px rgba(0,0,0,0.1)"
        }}
      >
        <h2
          style={{
            textAlign:"center"
          }}
        >
          Employee Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px"
            }}
          />

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"10px",
              background:"#0d6efd",
              color:"white",
              border:"none"
            }}
          >
            Login
          </button>

        </form>

        <p
          style={{
            marginTop:"10px",
            textAlign:"center"
          }}
        >
          {message}
        </p>
        <p className="text-center mt-3">

        New Employee?

        <button
          className="btn btn-link"
          onClick={() =>
          navigate("/register")
        }
      >
      Register Here
      </button>

      </p>

      </div>
    </div>
  );
}

export default Login;

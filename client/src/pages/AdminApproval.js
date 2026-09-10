import {
 useEffect,
 useState
} from "react";

import axios
from "axios";

import Navbar
from "../components/Navbar";

function AdminApproval() {

 const [leaves,
 setLeaves] =
 useState([]);

 useEffect(() => {

  loadLeaves();

 }, []);

 const loadLeaves =
 async () => {

  const response =
  await axios.get(

   "http://localhost:5000/api/admin/leaves",

   {
    headers:{
      Authorization:
      `Bearer ${
       localStorage.getItem(
        "token"
       )
      }`
    }
   }

  );

  setLeaves(
   response.data
  );

 };

 const approveLeave =
 async(id)=>{

  await axios.put(

   `http://localhost:5000/api/admin/approve/${id}`,

   {},

   {
    headers:{
      Authorization:
      `Bearer ${
       localStorage.getItem(
        "token"
       )
      }`
    }
   }

  );

  loadLeaves();

 };

 const rejectLeave =
 async(id)=>{

  await axios.put(

   `http://localhost:5000/api/admin/reject/${id}`,

   {},

   {
    headers:{
      Authorization:
      `Bearer ${
       localStorage.getItem(
        "token"
       )
      }`
    }
   }

  );

  loadLeaves();

 };

 return(

 <>
  <Navbar />

  <div className="container mt-5">

   <h2 className="mb-4">
    Leave Approvals
   </h2>

   <table className=
   "table table-bordered">

    <thead>

     <tr>

      <th>Name</th>

      <th>Type</th>

      <th>Days</th>

      <th>Status</th>

      <th>Action</th>

     </tr>

    </thead>

    <tbody>

    {
      leaves.map(
      (leave)=>(
      <tr key={leave.id}>

       <td>{leave.name}</td>

       <td>
        {leave.leave_type}
       </td>

       <td>
        {leave.total_days}
       </td>

       <td>
        {leave.status}
       </td>

       <td>

       <button

        className=
        "btn btn-success btn-sm me-2"

        onClick={()=>
        approveLeave(
          leave.id
        )
       }

       >
         Approve
       </button>

       <button

        className=
        "btn btn-danger btn-sm"

        onClick={()=>
        rejectLeave(
         leave.id
        )
       }

       >
         Reject
       </button>

      </td>

      </tr>

     ))
    }

    </tbody>

   </table>

  </div>

 </>

 );

}

export default AdminApproval;
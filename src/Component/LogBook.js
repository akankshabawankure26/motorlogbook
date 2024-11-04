// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import '../App.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'bootstrap';

// function LogBook() {
//   const [entries, setEntries] = useState([]);
//   const [showCase, setShowCase] = useState(true);
//   const [approveData, setApproveData] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost/motorlogbook/unApproveData.php");
//         console.log(response);
//         setEntries(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const fetchApproveData = async () => {
//       try {
//         const response = await axios.get("http://localhost/motorlogbook/approvedData.php");
//         console.log(response);
//         setApproveData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     // Call fetchData to fetch the data when the component mounts
//     fetchData();
//     fetchApproveData();
//   }, []);

//   const navigate = useNavigate();
//   const goToForm = (e) => {
//     navigate('/');

//   };

//   const approve = async (entry) => {
//     try {
//       // Create a FormData object or modify the entry data as needed
//       const formDataObject = new FormData();
//       formDataObject.append('driverName', entry.DriverName);
//       formDataObject.append('startKm', entry.StartKm);
//       formDataObject.append('endKm', entry.EndKm);
//       formDataObject.append('vehicleNo', entry.VehicalNo);

//       const response = await fetch("http://localhost/motorlogbook/approve.php", {
//         method: "POST",
//         body: formDataObject,
//       });

//       console.log(response);
//       setShowCase(false);

//     } catch (error) {
//       console.log("Error occurred:", error);
//     }
//   };


//   return (
//     <div className='App'>
//       <h1>MOTOR LOG BOOK</h1>
//       <table className="indent-table">
//         <thead>
//           <tr>
//             <th>Driver Name </th>
//             <th>Date</th>
//             <th>Start Km</th>
//             <th>End Km</th>
//             <th>Mileage Covered (Km)</th>
//             <th>Fuel (Liters)</th>
//             <th>Vehicle No.</th>
//             <th>Details of Journey</th>
//             <th>Initials / Signature</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {entries.map((entry, index) => (
//             <tr key={index}>
//               <td> {entry.DriverName} </td>
//               <td>{entry.date}</td>
//               <td>{entry.StartKm}</td>
//               <td>{entry.EndKm}</td>
//               <td>{entry.Mileage}</td>
//               <td>{entry.Fule}</td>
//               <td>{entry.VehicalNo}</td>
//               <td>{entry.detail}</td>
//               <td></td>
//               <td>
//                 {showCase ? (
//                   <button className='btn btn-primary' onClick={() => approve(entry)}>Ap</button>
//                 ) : (
//                   <button className='btn btn-secondary' > Approved </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table >
//       {/* <div className="text-end btn-gotoform">
//         <button className='btn btn-primary btn-right' onClick={goToForm}>Go To Form</button>
//       </div>
//     </div > */}

//       <h1>Approved Log</h1>
//       <table className="indent-table">
//         <thead>
//           <tr>
//             <th>Driver Name </th>
//             <th>Date</th>
//             <th>Start Km</th>
//             <th>End Km</th>
//             <th>Mileage Covered (Km)</th>
//             <th>Fuel (Liters)</th>
//             <th>Vehicle No.</th>
//             <th>Details of Journey</th>
//             <th>Initials / Signature</th>
//           </tr>
//         </thead>

//         <tbody>
//           {approveData.map((data, index) => (
//             <tr key={index}>
//               <td> {data.DriverName} </td>
//               <td>{data.date}</td>
//               <td>{data.StartKm}</td>
//               <td>{data.EndKm}</td>
//               <td>{data.Mileage}</td>
//               <td>{data.Fule}</td>
//               <td>{data.VehicalNo}</td>
//               <td>{data.detail}</td>
//               <td></td>
//             </tr>
//           ))}
//         </tbody>

//       </table >

//     </div>
//   );
// }

// export default LogBook;


import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';

function LogBook() {
  const [entries, setEntries] = useState([]);
  const [approvedIndex, setApprovedIndex] = useState(null); // State to track the approved entry
  const [approveData, setApproveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/motorlogbook/unApproveData.php");
        console.log(response);
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchApproveData = async () => {
      try {
        const response = await axios.get("http://localhost/motorlogbook/approvedData.php");
        console.log(response);
        setApproveData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchApproveData();
  }, []);

  const navigate = useNavigate();
  const goToForm = (e) => {
    navigate('/');
  };

  const approve = async (entry, index) => {
    try {
      const formDataObject = new FormData();
      formDataObject.append('driverName', entry.DriverName);
      formDataObject.append('startKm', entry.StartKm);
      formDataObject.append('endKm', entry.EndKm);
      formDataObject.append('vehicleNo', entry.VehicalNo);

      const response = await fetch("http://localhost/motorlogbook/approve.php", {
        method: "POST",
        body: formDataObject,
      });

      console.log(response);
      setApprovedIndex(index); // Set the currently approved entry index

    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const unapprove = (index) => {
    setApprovedIndex(null); // Reset the approved index to allow unapprove
  };

  return (
    <div className='App'>
      <h1>MOTOR LOG BOOK</h1>
      <table className="indent-table">
        <thead>
          <tr>
            <th>Driver Name </th>
            <th>Date</th>
            <th>Start Km</th>
            <th>End Km</th>
            <th>Mileage Covered (Km)</th>
            <th>Fuel (Liters)</th>
            <th>Vehicle No.</th>
            <th>Details of Journey</th>
            <th>Initials / Signature</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.DriverName}</td>
              <td>{entry.date}</td>
              <td>{entry.StartKm}</td>
              <td>{entry.EndKm}</td>
              <td>{entry.Mileage}</td>
              <td>{entry.Fule}</td>
              <td>{entry.VehicalNo}</td>
              <td>{entry.detail}</td>
              <td></td>
              <td>
                {approvedIndex === index ? (
                  <button className='btn btn-secondary' onClick={() => unapprove(index)}>Unapprove</button>
                ) : (
                  <button className='btn btn-primary' onClick={() => approve(entry, index)}>Ap</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Approved Log</h1>
      <table className="indent-table">
        <thead>
          <tr>
            <th>Driver Name </th>
            <th>Date</th>
            <th>Start Km</th>
            <th>End Km</th>
            <th>Mileage Covered (Km)</th>
            <th>Fuel (Liters)</th>
            <th>Vehicle No.</th>
            <th>Details of Journey</th>
            <th>Initials / Signature</th>
          </tr>
        </thead>
        <tbody>
          {approveData.map((data, index) => (
            <tr key={index}>
              <td>{data.DriverName}</td>
              <td>{data.date}</td>
              <td>{data.StartKm}</td>
              <td>{data.EndKm}</td>
              <td>{data.Mileage}</td>
              <td>{data.Fule}</td>
              <td>{data.VehicalNo}</td>
              <td>{data.detail}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogBook;

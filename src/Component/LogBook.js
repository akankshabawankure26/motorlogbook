import React, { useEffect, useState } from "react";
import axios from "axios";
import "./logbook.css";

function LogBook() {
  const [entries, setEntries] = useState([]); // Unapproved logs
  const [approveData, setApproveData] = useState([]); // Approved logs
  const [currentUnapprovedPage, setCurrentUnapprovedPage] = useState(1);
  const [currentApprovedPage, setCurrentApprovedPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch approved data
  const fetchApproveData = async () => {
    try {
      const response = await axios.get(
        "http://mvnpl.saturnxdigital.com/motorlogbook/approvedData.php"
      );
      setApproveData(response.data || []); // Default to empty array if data is undefined
    } catch (error) {
      console.error("Error fetching approved data : ", error);
    }
  };

  // Fetch unapproved data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://mvnpl.saturnxdigital.com/motorlogbook/unApproveData.php"
      );
      setEntries(response.data || []); // Default to empty array if data is undefined
    } catch (error) {
      console.error("Error fetching unapproved data : ", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchApproveData();
    fetchData();
  }, []);

  const approve = async (entry) => {
    try {
      const formData = new FormData();
      formData.append("contractorName", entry.ContractorName);
      formData.append("OpeningReading", entry.OpeningReading);
      formData.append("ClosingReading", entry.ClosingReading);
      formData.append("vehicleNo", entry.vehicleNumber);

      const response = await axios.post(
        "http://mvnpl.saturnxdigital.com/motorlogbook/approve.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data?.status === "success") {
        console.log("Approval successful!");
        fetchApproveData();
        fetchData();
      } else {
        console.error("Approval failed: ", response.data?.message);
      }
    } catch (error) {
      console.error("Error during approval: ", error);
    }
  };

  // Pagination logic
  const paginate = (data, currentPage) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  const totalUnapprovedPages = Math.ceil(entries.length / rowsPerPage);
  const totalApprovedPages = Math.ceil(approveData.length / rowsPerPage);

  return (
    <div className="App">
      {/* Header Section */}
      <div className="d-flex">
        <div className="btn text-start" style={{ marginRight: "200px" }}>
          <a href="/">
            <button className="back-btn">Back</button>
          </a>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h1 className="heading">MOTOR LOG BOOK</h1>
        </div>
        <div className="btn" style={{ marginLeft: "200px", marginTop: "20px" }}>
          <a href="/statement" className="text-end">
            <button className="statement">Statement</button>
          </a>
        </div>
      </div>

      {/* Unapproved Logs Section */}
      
      <table className="indent-table">
        <thead>
          <tr>
            <th>Contractor Name</th>
            <th>Vehicle Name</th>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Opening Reading</th>
            <th>Closing Reading</th>
            <th>Mileage Covered (Km)</th>
            <th>Fuel Type</th>
            <th>Fuel Quantity (LT)</th>
            <th>Break Down</th>
            <th>BD Hrs</th>
            <th>Remark</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginate(entries, currentUnapprovedPage).map((entry, index) => (
            <tr key={entry.vehicleNumber || index}>
              <td>{entry.ContractorName}</td>
              <td>{entry.VehicalName}</td>
              <td>{entry.vehicleNumber}</td>
              <td>{entry.date}</td>
              <td>{entry.OpeningReading}</td>
              <td>{entry.ClosingReading}</td>
              <td>{entry.Mileage}</td>
              <td>{entry.FuleType}</td>
              <td>{entry.FuleQuty}</td>
              <td>{entry.breakDown}</td>
              <td>{entry.BreakDownHr}</td>
              <td>{entry.detail}</td>
              <td>
                <button
                  className="statusBtn"
                  onClick={() => approve(entry, index)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-3" style={{width: "200px",height: "40px", justifyContent: "center",marginLeft: "571px"}}>
        <button
          onClick={() =>
            setCurrentUnapprovedPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentUnapprovedPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentUnapprovedPage} of {totalUnapprovedPages}
        </span>
        <button
          onClick={() =>
            setCurrentUnapprovedPage((prev) =>
              Math.min(prev + 1, totalUnapprovedPages)
            )
          }
          disabled={currentUnapprovedPage === totalUnapprovedPages}
        >
          Next
        </button>
      </div>

      {/* Approved Logs Section */}
      <h2 style={{marginLeft:"550px"}} className="mt-4 mb-2">Approved Logs</h2>
      <table className="indent-table">
        <thead>
          <tr>
            <th>Contractor Name</th>
            <th>Vehicle Name</th>
            <th>Vehicle Number</th>
            <th>Date</th>
            <th>Opening Reading</th>
            <th>Closing Reading</th>
            <th>Mileage Covered (Km)</th>
            <th>Fuel Type</th>
            <th>Fuel Quantity (LT)</th>
            <th>Break Down</th>
            <th>BD Hrs</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {paginate(approveData, currentApprovedPage).map((data, index) => (
            <tr key={data.vehicleNumber || index}>
              <td>{data.ContractorName}</td>
              <td>{data.VehicalName}</td>
              <td>{data.vehicleNumber}</td>
              <td>{data.date}</td>
              <td>{data.OpeningReading}</td>
              <td>{data.ClosingReading}</td>
              <td>{data.Mileage}</td>
              <td>{data.FuleType}</td>
              <td>{data.FuleQuty}</td>
              <td>{data.breakDown}</td>
              <td>{data.BreakDownHr}</td>
              <td>{data.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-3" style={{width: "200px",height: "40px", justifyContent: "center",marginLeft: "571px"}}>
        <button
          onClick={() =>
            setCurrentApprovedPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentApprovedPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentApprovedPage} of {totalApprovedPages}
        </span>
        <button
          onClick={() =>
            setCurrentApprovedPage((prev) =>
              Math.min(prev + 1, totalApprovedPages)
            )
          }
          disabled={currentApprovedPage === totalApprovedPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LogBook;

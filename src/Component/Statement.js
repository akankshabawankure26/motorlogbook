import React, { useState } from "react";
import * as XLSX from 'xlsx';
import "./DateRangeForm.css"; // Import the CSS file

function exportToExcel(data, fileName = 'motorlogs.xlsx') {
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate the Excel file and trigger download
  XLSX.writeFile(workbook, fileName);
}



function DateRangeForm() {

  const [entries, setEntries] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [VehicleName, setVehicleName] = useState("");


  const handleVehicleNameChange = (e) => setVehicleName(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    fetchData();
  };


  const fetchData = async () => {
    try {
      const data = new FormData();
      data.append("startDate", startDate);
      data.append("endDate", endDate);
      data.append("VehicleName", VehicleName);

      const response = await fetch("http://mvnpl.saturnxdigital.com/motorlogbook/statementData.php", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setEntries(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  return (
    <div>
      <div className="mb-4 mt-3">
        <h1>Statement</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="date-range-form">
          <div className="form-row">
            <label className="form-label">
              Vehicle Name:
              <select
                name="VehicleName"
                value={VehicleName}
                onChange={handleVehicleNameChange}
                className="form-control select"
                required
              >
                <option value="">Select Vehicle Name</option>
                <option value="Loader">Loader</option>
                <option value="JCB-3d">JCB-3d</option>
                <option value="Bolero">Bolero</option>
                <option value="PC Machine">PC Machine</option>
              </select>
            </label>

            <label className="form-label">
              Start Date:
              <input
                type="date"
                name="startDate"
                onChange={handleStartDateChange}
                required
                className="form-input"
              />
            </label>

            <label className="form-label">
              End Date:
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                required
                className="form-input"
              />
            </label>
          </div>
          <div className="form-button-row">
            <button type="submit" className="form-button">
              Submit
            </button>
          </div>
        </form>

        <section>
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
                <th>Initials/Signature</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(entries) && entries.length > 0 ? (
                entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.ContractorName}</td>
                    <td>{entry.VehicalName}</td>
                    <td>{entry.vehicleNumber}</td>
                    <td>{formatDate(entry.date)}</td>
                    <td>{entry.OpeningReading}</td>
                    <td>{entry.ClosingReading}</td>
                    <td>{entry.Mileage}</td>
                    <td>{entry.FuleType}</td>
                    <td>{entry.FuleQuty}</td>
                    <td>{entry.breakDown}</td>
                    <td>{entry.BreakDownHr}</td>
                    <td>{entry.detail}</td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" style={{ textAlign: "center" }}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <div className="d-flex">
          <div className="text-start mt-5" style={{ marginLeft: "100px", width: "550px" }}>
            <button className="form-button" onClick={() => exportToExcel(entries)}>Export to Excel</button>
          </div>
          <div className="btn text-end mt-5" style={{ marginLeft: "200px" }}>
            <a href='/'><button className="form-button ">Back</button></a>
          </div>

        </div>
      </div >
    </div>
  );
}

export default DateRangeForm;
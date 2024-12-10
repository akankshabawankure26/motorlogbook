import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UnApprovedLog() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://mvnpl.saturnxdigital.com/motorlogbook/unApproveData.php");
                console.log(response);
                setEntries(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []); // Add [] as the second argument to avoid continuous API calls.

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };

    return (
        <div>
            <div className='d-flex'>
                <div className="btn text-start" style={{ marginRight: "250px" }}>
                    <a href='/'><button className="back-btn ">Back</button></a>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <h1 className="heading ">Un-Approved Log</h1>
                </div>
            </div>

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
                    {entries.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.ContractorName}</td>
                            <td>{entry.VehicalName}</td>
                            <td>{entry.vehicleNumber}</td>
                            {/* Format the date here */}
                            <td>{formatDate(entry.date)}</td>
                            <td>{entry.OpeningReading}</td>
                            <td>{entry.ClosingReading}</td>
                            <td>{entry.Mileage}</td>
                            <td>{entry.FuleType}</td>
                            <td>{entry.FuleQuty}</td>
                            <td>{entry.breakDown}</td>
                            <td>{entry.BreakDownHr}</td>
                            <td>{entry.detail}</td>
                            <td>
                                Un-Approved
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UnApprovedLog;

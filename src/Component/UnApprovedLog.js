import React, {useEffect,useState} from 'react'
import axios from 'axios';

function UnApprovedLog() {
    const [entries, setEntries] = useState([]);
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
        fetchData();
    })
    return (
        <div>
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
                            <td> {entry.DriverName} </td>
                            <td>{entry.date}</td>
                            <td>{entry.StartKm}</td>
                            <td>{entry.EndKm}</td>
                            <td>{entry.Mileage}</td>
                            <td>{entry.Fule}</td>
                            <td>{entry.VehicalNo}</td>
                            <td>{entry.detail}</td>
                            <td></td>
                            <td>
                                Un-Approved
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table >
        </div>
    );
}
export default UnApprovedLog;
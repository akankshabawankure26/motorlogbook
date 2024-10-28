import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../App.css';
import { useNavigate } from 'react-router-dom';

function LogBook() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/motorlogbook/getData.php");
        console.log(response);
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData to fetch the data when the component mounts
    fetchData();
  }, []);

  const navigate = useNavigate();
    const goToForm = (e) => {
        navigate('/');
       
    };

  return (
    <div className='App'>
      <h1>MOTOR LOG BOOK</h1>
      <table className="indent-table">
        <thead>
          <tr>
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
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.StartKm}</td>
              <td>{entry.EndKm}</td>
              <td>{entry.Mileage}</td>
              <td>{entry.Fule}</td>
              <td>{entry.VehicalNo      }</td>
              <td>{entry.detail}</td>
              <td>{entry.initials}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end btn-gotoform">
      <button className='btn btn-primary btn-right' onClick={goToForm}>Go To Form</button>
      </div>
    </div>
  );
}

export default LogBook;

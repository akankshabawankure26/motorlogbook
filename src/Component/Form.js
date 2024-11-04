import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Form() {

    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        startKm: '',
        endKm: '',
        fuel: '',
        vehicleNo: '',
        details: '',
        mileageCovered: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddEntry = async (e) => {
        e.preventDefault();
        const mileageCovered = formData.endKm - formData.startKm;
        const newEntry = { ...formData, mileageCovered };
        setEntries([...entries, newEntry]);


        console.log(formData);
        const formDataObject = new FormData();
        formDataObject.append("vehicleNo", formData.vehicleNo);
        formDataObject.append("driverName", formData.driverName);
        formDataObject.append("date", formData.date);
        formDataObject.append("startKm", formData.startKm);
        formDataObject.append("endKm", formData.endKm);
        formDataObject.append("fuel", formData.fuel);
        formDataObject.append("details", formData.details);
        formDataObject.append("mileageCovered", formData.endKm - formData.startKm);

        try {

            const response = await fetch("http://localhost/motorlogbook/addLog.php", {
                method: "POST",
                body: formDataObject,
            });

            const result = await response.json();

            if (result.status === "success") {
                // Handle success, e.g., show a success message
                alert("Log added sucessfully");


            } else {
                // Handle error, e.g., show an error message
                console.error("Error adding log:", result.message);
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error adding user:", error);
        }
        // Optionally, you can reset the form after successful submission
        setFormData({
            vehicleNo: '',
            driverName: '',
            date: '',
            startKm: '',
            endKm: '',
            fuel: '',
            details: '',
            mileageCovered: ''
        });

    };

    const nav = useNavigate();
    const unApprovedLog = () => {
    nav("/unapprovedlog");
    }
    return (
        <div>

            <div className='d-flex align-items-center first-div'>
                <h2 className="text-center mb-0 me-3">Add Record</h2>
                <button className='text-end btn btn-primary' onClick={unApprovedLog}> Unapproved Log</button>
            </div>
            <form onSubmit={handleAddEntry} className="form-container">
                <div className="mb-3">
                    <label className="form-label">Vehicle No. -: </label>
                    <input type="tel" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="form-control" />
                </div>
                <div class="mb-3">
                    <label className="form-label">Driver Name -:</label>
                    <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} className="form-control" />
                </div>

                <div className="md-3">
                    <label className="form-label">Date -: </label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" />
                </div>
                <div class="mb-3">

                </div>
                <div class="mb-3 ">
                    <label className="form-label">Starting Km. -: </label>
                    <input type="tel" name="startKm" value={formData.startKm} onChange={handleChange} className="form-control" />
                </div>

                <div class="mb-3">
                    <label className="form-label">Ending Km. -: </label>
                    <input type="tel" name="endKm" value={formData.endKm} onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div class="mb-3">
                    <label className="form-label">Fule -: </label>
                    <input type="tel" name="fuel" value={formData.fuel} onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="md-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="text-start mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>


        </div>
    )
}

export default Form
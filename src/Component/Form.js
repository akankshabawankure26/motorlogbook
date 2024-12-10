import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [contractors, setContractors] = useState([]);
    const [vehicals,setVehicals] = useState([]);
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({
        VehicalName: '',
        vehicleNumber: '',
        ContractorName: '',
        date: '',
        OpeningReading: '',
        ClosingReading: '',
        FuelType: '',
        FuelQuty: '',
        bds: '',
        bde: '',
        details: '',
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "vehicleNumber") {
            // Regular expression to allow only alphabets and numbers
            const regex = /^[a-zA-Z0-9]*$/;

            if (regex.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddEntry = async (e) => {
        e.preventDefault();
        const mileageCovered =
            Number(formData.ClosingReading) - Number(formData.OpeningReading);
        console.log(mileageCovered);
        const newEntry = { ...formData, mileageCovered };
        setEntries([...entries, newEntry]);

        const formDataObject = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObject.append(key, formData[key]);
        });
        formDataObject.append('mileageCovered', mileageCovered);

        try {
            //http://mvnpl.saturnxdigital.com/motorlogbook/addLog.php
            console.log("inside try block");
            const response = await fetch(
                'http://mvnpl.saturnxdigital.com/motorlogbook/addLog.php',
                {
                    method: 'POST',
                    body: formDataObject,
                }
            );
            console.log(response);
            const result = await response.json();
            console.log(result.status);
            if (result.status === 'success') {
                alert('Log added successfully');
            } else {
                console.error('Error adding log:', result.message);
            }
        } catch (error) {
            console.error('Error adding log:', error);
        }

        setFormData({
            VehicalName: '',
            vehicleNumber: '',
            ContractorName: '',
            date: '',
            OpeningReading: '',
            ClosingReading: '',
            FuelType: '',
            FuelQuty: '',
            bds: '',
            bde: '',
            details: '',
        });
    };

    const fetchContractors = async () => {
        try {
            const response = await fetch("http://mvnpl.saturnxdigital.com/motorlogbook/getContractor.php");
            const data = await response.json();
            if (data.success) {
                setContractors(data.data);
            }
        } catch (err) {
            console.error("Error fetching contractors:", err);
        }
    };

    const fetchVehical = async () => {
        try {
            const response = await fetch("http://mvnpl.saturnxdigital.com/motorlogbook/getVehical.php");
            const data = await response.json();
            if (data.success) {
                setVehicals(data.data);
            }
        } catch (err) {
            console.error("Error fetching Vehicals:", err);
        } 
    };

    useEffect(() => {
        fetchContractors();
        fetchVehical();
    },[]);

    return (
        <div>
            <div className="mb-3">
                <div className="d-flex">
                    <div className="btn text-start" style={{ marginRight: '150px' }}>
                        <a href="/">
                            <button className="back-btn">Back</button>
                        </a>
                    </div>
                    <div style={{ marginTop: '20px', width: '400px' }}>
                        <h1 className="heading">Add Record</h1>
                    </div>
                    <div
                        className="btn"
                        style={{ marginLeft: '100px', marginTop: '20px', width: '550px' }}
                    >
                        <a href="/unapprovedlog" className="text-end">
                            <button className="statement">Unapproved Log</button>
                        </a>
                    </div>
                </div>

                <div className="app-container">
                    <div className="form-container">
                        <form className="form" onSubmit={handleAddEntry}>
                            {/* Vehicle Name */}
                            <div className="form-group">
                                <label>Vehicle Name: *</label>
                                <select
                                    name="VehicalName"
                                    value={formData.VehicalName}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Vehicle Name</option>
                                    {
                                        vehicals.map((vehical, index) => (
                                        
                                            <option value={vehical.vehicalName}>{vehical.vehicalName}</option>
                                        ))
                                    }
                                    {/* <option value="Loader">Loader</option>
                                    <option value="JCB-3d">JCB-3d</option>
                                    <option value="Bolero">Bolero</option>
                                    <option value="PC Machine">PC Machine</option> */}
                                </select>
                            </div>

                            {/* Vehicle Number */}
                            <div className="form-group">
                                <label>Vehicle Number: *</label>
                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    value={formData.vehicleNumber}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    placeholder="Enter Vehicle Number"
                                />
                            </div>

                            {/* Contractor Name */}
                            <div className="form-group">
                                <label>Contractor Name: *</label>
                                <select
                                    name="ContractorName"
                                    value={formData.ContractorName}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Contractor Name</option>
                                    {
                                        contractors.map((contactor, index) => (
                                        
                                            <option value={contactor.ContractorName}>{contactor.ContractorName}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Date */}
                            <div className="form-group">
                                <label>Date: *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            {/* Reading and Fuel */}
                            <div className="form-group">
                                <label>Opening Km: *</label>
                                <input
                                    type="number"
                                    name="OpeningReading"
                                    value={formData.OpeningReading}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    placeholder="Enter Opening Km"
                                />
                            </div>

                            <div className="form-group">
                                <label>Closing Km: *</label>
                                <input
                                    type="number"
                                    name="ClosingReading"
                                    value={formData.ClosingReading}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    placeholder="Enter Closing Km"
                                />
                            </div>

                            <div className="form-group">
                                <label>Fuel Type: *</label>
                                <select
                                    name="FuelType"
                                    value={formData.FuelType}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">Select Fuel Type</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Fuel Quantity (L): *</label>
                                <input
                                    type="number"
                                    name="FuelQuty"
                                    value={formData.FuelQuty}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>

                            {/* Break-Down Times */}
                            <div className="form-group">
                                <label>Break-Down Start:</label>
                                <input
                                    type="time"
                                    name="bds"
                                    value={formData.bds}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Break-Down End:</label>
                                <input
                                    type="time"
                                    name="bde"
                                    value={formData.bde}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="form-group text-center">
                                <button className="log-button" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;

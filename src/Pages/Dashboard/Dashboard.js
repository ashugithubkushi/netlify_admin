import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Box } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import './Dashboard.css';
import Navbar from '../../Components/Navbar/Navbar';

const Dashboard = () => {
  const [totalSlots, setTotalSlots] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [aggregatedVehicles, setAggregatedVehicles] = useState([]);
  const [selectedVehicleName, setSelectedVehicleName] = useState("");
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState("");
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [modal, setModal] = useState(false);
  const [villaNumber, setVillaNumber] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
  ];

  useEffect(() => {
    axios
      .get("https://combined-data5.free.beeceptor.com/combined-data")
      // .get("")
      .then((response) => {
        if (response.data && response.data.counts) {
          setTotalSlots(response.data.counts.totalSlots || 0);
          setTotalVehicles(response.data.counts.totalVehicles || 0);
          setTotalUsers(response.data.counts.totalUsers || 0);
          console.log("Total Counts", response);
        } else {
          console.error("Invalid or empty counts data:", response.data);
          setTotalSlots(0);
          setTotalVehicles(0);
          setTotalUsers(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching combined data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://vehnum3.free.beeceptor.com/vehNum3")
      // .get("http://localhost:3000/vehicles")
      .then((response) => {
        const vehicles = response.data;

        const vehicleMap = vehicles.reduce((acc, vehicle) => {
          if (!acc[vehicle.vehicleName]) {
            acc[vehicle.vehicleName] = {
              id: vehicle._id,
              count: 0,
              vehicleNums: []
            };
          }
          acc[vehicle.vehicleName].count += 1;
          acc[vehicle.vehicleName].vehicleNums.push(vehicle.vehicleNum);
          return acc;
        }, {});

        const aggregatedData = Object.keys(vehicleMap).map((vehicleName) => ({
          vehicleName,
          id: vehicleMap[vehicleName].id,
          count: vehicleMap[vehicleName].count,
          vehicleNums: Array.from(new Set(vehicleMap[vehicleName].vehicleNums))
        }));

        setAggregatedVehicles(aggregatedData);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  useEffect(() => {
    const selectedVehicle = aggregatedVehicles.find(vehicle => vehicle.vehicleName === selectedVehicleName);
    if (selectedVehicle) {
      setVehicleNumbers(selectedVehicle.vehicleNums);
    } else {
      setVehicleNumbers([]);
    }
  }, [selectedVehicleName, aggregatedVehicles]);

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicleName(vehicle.vehicleName);
    fetchSlots(vehicle.vehicleName);
    toggleModal();
  };

  const fetchSlots = (vehicleName) => {
    // fetch(`https://slotapi3.free.beeceptor.com/slots?vehicleName=${vehicleName}`)
    fetch(``)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response of Slots:", data);
        if (data && data.vehicles) {
          const vehicleData = data.vehicles.find(
            (v) => v.vehicleName === vehicleName
          );
          setAvailableDates(vehicleData ? vehicleData.dates : []);
        } else {
          console.error("Invalid or empty slots data:", data);
          setAvailableDates([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching available slots:", error);
      });
  };

  const toggleModal = () => {
    if (!modal) {
      setModal(true);
      resetForm();
    } else {
      setModal(false);
    }
  };

  const resetForm = () => {
    setVillaNumber("");
    setDate("");
    setSelectedTime("");
    setSelectedVehicleNumber("");
  };

  const handleTimeClick = (time, date) => {
    const dateData = availableDates.find((d) => d.date === date);
    if (dateData) {
      const slot = dateData.slots.find((slot) => slot.time === time);
      if (slot && slot.isBooked) {
        alert("This slot is already booked.");
        return;
      }
    }
    setSelectedTime(time);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setSelectedTime("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});

    const errors = {};
    if (!selectedVehicleNumber) errors.vehicle = "Vehicle number is required.";
    if (!date) errors.date = "Date is required.";
    if (!selectedTime) errors.time = "Time slot is required.";
    if (!villaNumber) errors.villaNumber = "Villa number is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formData = {
      vehicle: selectedVehicleNumber,
      date,
      timeSlot: selectedTime,
      villaNumber,
    };

    axios
      .post("http://localhost:3000/createSlots", {
      // .post("https://vehicles-slot.free.beeceptor.com/submit", {
        formData,
      })
      .then((response) => {
        console.log("Response from server", response);
        console.log("response from Api", response.data);
        const combinedData = `Selected VehicleName: ${selectedVehicleName}\nSelected Vehicle: ${selectedVehicleNumber}\nSelected Date: ${date}\nSelected Time Slot: ${selectedTime}\nVilla Number: ${villaNumber}`;
        console.log("Submitted data", combinedData);
      })
      .catch((error) => {
        console.error("Error Occured", error);
      });
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ width: "100%", p: 1, height: "100vh", mt: 1, borderRadius: 5 }}>
        <div className="grid-containers">
          <div className="grid-items">
            <div className="d-flex justify-content-between align-items-center">
              <div className="count-text">
                <h1><b>{totalSlots}</b></h1>
                <h5><strong>Booked Slots</strong></h5>
              </div>
              <div className="icon-wrapper">
                <ListAltIcon className="list-icon" sx={{ fontSize: 45 }} />
              </div>
            </div>
          </div>

          <div className="grid-items">
            <div className="d-flex justify-content-between align-items-center">
              <div className="count-text">
                <h1><b>{totalVehicles}</b></h1>
                <h5><strong>Total Vehicles</strong></h5>
              </div>
              <div className="icon-wrapper">
                <AgricultureIcon className="list-icon" sx={{ fontSize: 55 }} />
              </div>
            </div>
          </div>

          <div className="grid-items">
            <div className="d-flex justify-content-between align-items-center">
              <div className="count-text">
                <h1><b>{totalUsers}</b></h1>
                <h5><strong>Total Users</strong></h5>
              </div>
              <div className="icon-wrapper">
                <PeopleAltIcon className="list-icon" sx={{ fontSize: 55 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="m-1">
            <h4><strong>Click here to book your Slot</strong></h4>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {aggregatedVehicles.map((vehicle, index) => (
                  <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title ms-2">
                            <span className="text-muted"><b className="float-end">ID: {vehicle.id}</b></span><br />
                            <b>{vehicle.vehicleName}</b>
                          </h5>
                        </div>
                        <div onClick={() => handleVehicleClick(vehicle)} className="d-grid">
                          <span>Total: {vehicle.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Modal
                isOpen={modal}
                toggle={toggleModal}
                centered={true}
                style={{ marginTop: "40px" }}
                size="xl"
              >
                <ModalHeader toggle={toggleModal}>
                  <h4>Slot Details:</h4>
                </ModalHeader>
                <ModalBody>
                  <form>
                    <h1>Book the slots</h1>

                    <label htmlFor="">Selected Vehicle:</label>
                    <div className="m-2 p-1">
                      <input
                        type="text"
                        value={selectedVehicleName}
                        readOnly
                        style={{ width: "75%" }}
                      />
                    </div>

                    <label htmlFor="">Villa Number</label>
                    <div className="m-2 p-1">
                      <input
                        type="text"
                        id="villaNumber"
                        value={villaNumber}
                        onChange={(e) => setVillaNumber(e.target.value)}
                        placeholder="Villa Number"
                        style={{ width: "75%" }}
                      />
                    </div>

                    <label htmlFor="vehicle">Select Vehicle Number:</label>
                    <div className="m-2 p-1">
                      <select
                        id="vehicle"
                        value={selectedVehicleNumber}
                        onChange={(e) => setSelectedVehicleNumber(e.target.value)}
                        style={{ width: "75%" }}
                      >
                        <option value="">Vehicle Number</option>
                        {vehicleNumbers.map((vehicleNum, index) => (
                          <option key={index} value={vehicleNum}>
                            {vehicleNum}
                          </option>
                        ))}
                      </select>
                    </div>

                    <br /><br />

                    <label htmlFor="date">Select Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={handleDateChange}
                      required
                    />

                    <br /><br />

                    <label>Select Time Slot:</label>
                    <div className="time-slot-container">
                      {timeSlots.map((slot, index) => {
                        const isBooked = availableDates
                          .find((d) => d.date === date)
                          ?.slots.some((s) => s.time === slot && s.isBooked);
                        return (
                          <button
                            type="button"
                            value={slot}
                            key={index}
                            className={`time-slot-button ${
                              selectedTime === slot ? "selected" : ""
                            } ${isBooked ? "disabled" : ""}`}
                            onClick={() => handleTimeClick(slot, date)}
                            disabled={isBooked}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    <button type="submit" onClick={handleSubmit}>
                      Submit
                    </button>

                    {Object.keys(formErrors).length > 0 && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        <p>Please fill all the fields above:</p>
                      </div>
                    )}
                  </form>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Dashboard;
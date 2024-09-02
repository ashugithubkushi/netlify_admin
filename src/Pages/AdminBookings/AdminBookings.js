import React, { useEffect, useState } from "react";
import "./AdminBookings.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";
import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";

const AdminBookings = ({ setSlots }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    selectedVehicle: "",
    selectedDate: null,
    vehicleNumber: "",
    villaNumber: "",
    status: "",
  });

  const [vehicleNames, setVehicleNames] = useState([]);
  const [vehicleNumbers, setVehicleNumbers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vehicles")
    // axios.get("https://vehnum3.free.beeceptor.com/vehNum3")
      .then((res) => {
        const vehicles = res.data;
        const names = vehicles.map(vehicle => vehicle.vehicleName);
        const uniqueNames = [...new Set(names)];
        const numbers = vehicles.map(vehicle => vehicle.vehicleNum);
        const uniqueNumbers = [...new Set(numbers)];
        setVehicleNames(uniqueNames);
        setVehicleNumbers(uniqueNumbers);
      })
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleConfirmDeleteModal = () => setConfirmDeleteModal(!confirmDeleteModal);
  const handleDelete = (slot) => {
    setSelectedRow(slot);
    toggleConfirmDeleteModal();
  };

  const confirmDelete = () => {
    setData(data.filter(slot => slot !== selectedRow));
    toggleConfirmDeleteModal();
    axios.delete(`http://localhost:3000/deleteslots/${selectedRow._id}`)
      .then(res => {
        console.log("Slot deleted successfully:", res.data);
      })
      .catch(err => {
        console.error("Error deleting slot:", err);
      });
  };

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    // axios.get("https://slots-table2.free.beeceptor.com/slot-table2")
    axios.get("http://localhost:3000/getslots")
      .then((res) => {
        console.log("API Response of Bookings", res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
      });
  }, []);

  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const filteredData = data.filter(slot => {
    if (filter !== '' && slot.selectedVehicle !== filter) {
      return false;
    }
    if (startDate && endDate) {
      const slotDate = new Date(slot.selectedDate);
      return slotDate >= startDate && slotDate <= endDate;
    }
    return true;
  });
  const Update = (e, status, id) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updateslots/${id}`, { status })
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (slot) => {
    setSelectedSlot(slot);
    setFormData(slot);
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const updatedData = data.map(slot => {
      if (slot === selectedSlot) {
        return formData;
      }
      return slot;
    });
    setData(updatedData);
    toggleModal();
    handleUpdate(selectedSlot._id, formData);
  };

  const handleUpdate = (slotId, updatedSlotData) => {
    axios.put(`http://localhost:3000/updateslots/${slotId}`, updatedSlotData)
      .then(res => {
        console.log("Slot updated successfully in backend:", res.data);
      })
      .catch(err => {
        console.error("Error updating slot in backend:", err);
      });
  };

  const uniqueVehicleNames = [...new Set(data.map(slot => slot.selectedVehicle))];

  return (
    <div>
      <Navbar />
      <Box sx={{ width: '100%', p: 2, height: '100vh', mt: 1, borderRadius: 5 }}>
        <div className="table-container1">
          <div className="table-container">
            <div className="d-flex float-end">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="From Date"
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="To Date"
              />
            </div>

            <div className="slot m-1"><h5><b>Slot Details</b></h5></div>

            <table className="table-no-border">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>
                    Vehicle Name
                    <select
                      value={filter}
                      onChange={handleFilterChange}
                      style={{ width: '150px', marginLeft: '5px' }}
                    >
                      <option value="">Show All</option>
                      {uniqueVehicleNames.map((vehicleName, index) => (
                        <option key={index} value={vehicleName}>{vehicleName}</option>
                      ))}
                    </select>
                  </th>
                  <th>Date</th>
                  <th>Slot Time</th>
                  <th>Vehicle Number</th>
                  <th>Villa Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((slot, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{slot.selectedVehicle}</td>
                      <td>{slot.selectedDate}</td>
                      <td>{slot.selectedSlot}</td>
                      <td>{slot.vehicleNumber}</td>
                      <td>{slot.villaNumber}</td>
                      <td>
                        <div className="mb-2">
                          <select className="form-control"
                            onChange={(e) => Update(e, e.target.value, slot._id)}
                            value={slot.status}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In progress">In progress</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-success m-2" onClick={() => handleEdit(slot)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(slot)}>Delete</button>
                      </td>
                    </tr>
                    <tr className="divider-row">
                      <td colSpan="8"></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal isOpen={confirmDeleteModal} toggle={toggleConfirmDeleteModal} centered={true}>
          <ModalHeader toggle={toggleConfirmDeleteModal}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this slot?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleConfirmDeleteModal}>Cancel</Button>
            <Button color="danger" onClick={confirmDelete}>Delete</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal} toggle={toggleModal} centered={true} style={{ marginTop: '60px' }}>
          <ModalHeader toggle={toggleModal}>Edit Slot</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vehicle Name:</label>
                <select
                  name="selectedVehicle"
                  value={formData.selectedVehicle}
                  onChange={handleInputChange}
                >
                  <option value="">Select Vehicle</option>
                  {vehicleNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Vehicle Number:</label>
                <select
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                >
                  <option value="">Select Vehicle Number</option>
                  {vehicleNumbers.map((number, index) => (
                    <option key={index} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Villa Number:</label>
                <input
                  type="text"
                  name="villaNumber"
                  value={formData.villaNumber}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </Modal>
      </Box>
    </div>
  );
};

export default AdminBookings;
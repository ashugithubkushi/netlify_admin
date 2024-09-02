import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, Tooltip } from "reactstrap";
import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import './VehiclesList.css';

const VehiclesList = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [errors, setErrors] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState(null);
//   const [vehicleCounts, setVehicleCounts] = useState({}); 

//   const { id } = useParams();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!vehicleName.trim()) {
      newErrors.vehicleName = "Vehicle Name is required";
      isValid = false;
    }

    if (!vehicleNum.trim()) {
      newErrors.vehicleNum = "Vehicle Number is required";
      isValid = false;
    }

    if (!contactNum.trim()) {
      newErrors.contactNum = "Contact Number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // if (validateForm()) {
  //     if (validateForm()) {
  //       // Check if vehicleNum already exists
  //       if (vehicles.some(vehicle => vehicle.vehicleNum === vehicleNum)) {
  //         alert("Vehicle number already exists. Please enter valid vehicle number.");
  //         return; // Stop further execution
  //       }


  //     axios
  //       // .post("http://localhost:3000/createVehicle", {
  //       .post("https://slots-table.free.beeceptor.com/add-vehicles-post", {
  //         vehicleName,
  //         vehicleNum,
  //         contactNum,
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         console.log('Submitted Data:', vehicleName, vehicleNum, contactNum);
  //         const newVehicle = result.data;
  //         setVehicles([...vehicles, newVehicle]);
  //         setVehicleCounts((prevCounts) => ({
  //           ...prevCounts,
  //           [newVehicle.vehicleName]: prevCounts[newVehicle.vehicleName]
  //             ? prevCounts[newVehicle.vehicleName] + 1
  //             : 1,
  //         }));
  //         toggleModal();
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post("http://localhost:3000/createVehicle", { vehicleName, vehicleNum, contactNum })
    //   axios.post("https://slots-table.free.beeceptor.com/add-vehicles-post", { vehicleName, vehicleNum, contactNum })
       .then(result => {
          console.log(result);
          console.log('Submitted Data:', vehicleName, vehicleNum, contactNum);

          const newVehicle = { vehicleName, vehicleNum, contactNum };
          
          // Update local storage
          const updatedVehicles = [...vehicles, newVehicle];
          localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));

          setVehicles([...vehicles, { vehicleName, vehicleNum, contactNum }]);
          toggleModal();
        })
        .catch(err => console.log(err));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "vehicleName") {
      setVehicleName(value);
    } else if (name === "vehicleNum") {
      setVehicleNum(value);
    } else if (name === "contactNum") {
      setContactNum(value);
    }
  };

  const resetForm = () => { 
    setVehicleName("");
    setVehicleNum("");
    setContactNum("");
  };

  const toggleModal = () => {
    
    if (!showModal) {
      setVehicleName("");
      setVehicleNum("");
      setContactNum("");
    }
    setShowModal(!showModal);
  };

  const toggleEditModal = (vehicleData) => {
    if (!showEditModal) {
      setVehicleName(vehicleData.vehicleName);
      setVehicleNum(vehicleData.vehicleNum);
      setContactNum(vehicleData.contactNum);
    }
    setShowEditModal(!showEditModal);
    setEditVehicleId(vehicleData._id);
  };

  // useEffect(() => {
  //   axios
  //     // .get("http://localhost:3000/vehicles")
  //     .get("https://login0.free.beeceptor.com/get-vehicles")
  //     .then((response) => {
  //       const initialCounts = {};
  //       response.data.forEach((vehicle) => {
  //         initialCounts[vehicle.vehicleName] = initialCounts[vehicle.vehicleName]
  //           ? initialCounts[vehicle.vehicleName] + 1
  //           : 1;
  //       });
  //       setVehicles(response.data);
  //       setVehicleCounts(initialCounts);
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching vehicle data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios
    //   .get("https://vehnum3.free.beeceptor.com/vehNum3")
      .get("http://localhost:3000/vehicles")
      .then((response) => {
        console.log("API Response of Add Vehicles:", response);    
        const initialCounts = {};
        response.data.forEach((vehicle) => {
          initialCounts[vehicle.vehicleName] = initialCounts[vehicle.vehicleName]
            ? initialCounts[vehicle.vehicleName] + 1
            : 1;
        });
  
        setVehicles(response.data);
        // setVehicleCounts(initialCounts);

      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);


  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:3000/updateVehicle/${editVehicleId}`, {
        // .put(`https://mp31c0a15b1e5005443b.free.beeceptor.com/update-vehicle/${editVehicleId}`, {
          vehicleName,
          vehicleNum,
          contactNum,
        })
        .then((result) => {
          console.log("API Response of Updated Vehicles:", result);    
          const updatedIndex = vehicles.findIndex(v => v._id === editVehicleId);
        const updatedVehicle = { ...vehicles[updatedIndex], vehicleName, vehicleNum, contactNum};
        const updatedVehicles = [...vehicles.slice(0, updatedIndex), updatedVehicle, ...vehicles.slice(updatedIndex + 1)];
         setVehicles(updatedVehicles);
          toggleEditModal();
        })
        .catch((err) => console.log(err));
    }
  };


  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios
        .delete(`http://localhost:3000/deleteVehicle/${id}`)
        .then((result) => {
          console.log(result);
          setVehicles((prevVehicles) =>
            prevVehicles.filter((vehicle) => vehicle._id !== id)
          );
        //   setVehicleCounts((prevCounts) => ({
        //     ...prevCounts,
        //     [vehicleName]: prevCounts[vehicleName] - 1,
        //   }));
        })
        .catch((err) => console.log(err));
    }
  };

  //Image
  //image 
// const [image, setImage] = useState(null); 
// const handleImageUpload = (e) => {
//   const file = e.target.files[0]; 
//   setImage(file); 
// };

  return (

    <div>
<Navbar/>

    <div className="">
      <Modal isOpen={showModal} toggle={toggleModal} centered style={{ maxWidth: '38%', margin: '1.75rem auto' }}>
  <ModalBody>
    <form onSubmit={handleSubmit}>
      <Button className="float-end" color="secondary" onClick={toggleModal}>
        x
      </Button>
      <h2 className='text-center mb-4'>Create Vehicle Data</h2>

      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          {/* <div className="p-4">
            <label htmlFor=""><h3>Image</h3></label>
            <input
              type="file"
              className="form-control form-control-full"
              id="imageUpload"
              name="image"
              onChange={handleImageUpload}
              style={{ width: '100%' }}
            />
            <Tooltip placement="bottom-end" isOpen={!!errors.image} target="imageUpload">
              {errors.image}
            </Tooltip>
          </div> */}

          <div className="p-4">
            <label htmlFor=""><h4>Vehicle Name</h4></label>
            <input
              type="text"
              id="vehicleName"
              name="vehicleName"
              placeholder="Vehicle Name"
              className="form-control"
              value={vehicleName}
              onChange={handleInputChange}
              style={{ width: '100%' }}  
              // invalid={!!errors.vehicleName}
            />
            <Tooltip
              placement="bottom-end"
              isOpen={!!errors.vehicleName}
              target="vehicleName"
            >
              {errors.vehicleName}
            </Tooltip>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <div className="p-4">
            <label htmlFor=""><h4>Vehicle Number</h4></label>
            <input
              type="text"
              id="vehicleNum"
              name="vehicleNum"
              placeholder="Vehicle Number"
              className="form-control"
              value={vehicleNum}
              onChange={handleInputChange}
              style={{ width: '100%' }}  
              // invalid={!!errors.vehicleNum}
            />
            <Tooltip
              placement="bottom-end"
              isOpen={!!errors.vehicleNum}
              target="vehicleNum"
            >
              {errors.vehicleNum}
            </Tooltip>
          </div>

          <div className="p-4">
            <label htmlFor=""><h4>Contact Number</h4></label>
            <input
              type="text"
              id="contactNum"
              name="contactNum"
              placeholder="Contact Number"
              className="form-control"
              value={contactNum}
              onChange={handleInputChange}
              style={{ width: '100%' }}  
              // invalid={!!errors.contactNum}
            />
            <Tooltip
              placement="bottom-end"
              isOpen={!!errors.contactNum}
              target="contactNum"
            >
              {errors.contactNum}
            </Tooltip>
          </div>
        </div>
      </div>
      
      <div className="m-4 text-end">
        <Button color="secondary" className="m-2" onClick={resetForm}>
          Reset
        </Button>
        <Button color="primary" type="submit">
          Add
        </Button>
      </div>
    </form>
  </ModalBody>
</Modal>

      <Box sx={{ width: "100%", p: 2, mt: 1, borderRadius: 5 }}>
        <div className="table-container1">
          <div className="table-container">
            <div className="name-with-button-container">
              <span className="name">
                <h5>
                  <b>Vehicles Data</b>
                </h5>
              </span>
              <button className="btn btn-success float-end" onClick={toggleModal}>
                Add Vehicle
              </button>
            </div>

            <table className="table-no-border ">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle Number</th>
                  <th>Contact Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr key={index} className="divider-row">
                    <td>{index + 1}</td>
                    <td>{vehicle.vehicleName}</td>
                    <td>{vehicle.vehicleNum}</td>
                    <td>{vehicle.contactNum}</td>
                    <td>
                      <button
                        className="btn btn-success m-1"
                        onClick={() => toggleEditModal(vehicle)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger delete-button"
                        onClick={() => handleDelete(vehicle._id, vehicle.vehicleName)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>

      {/* Edit Vehicle Modal */}
      <Modal isOpen={showEditModal} toggle={toggleEditModal} centered={true}>
  <ModalBody>
    <form onSubmit={handleUpdate}>
      <Button className="float-end" color="secondary" onClick={toggleEditModal}>x</Button>
      <h2 className="align-items-center justify-content-center mb-4">Edit Vehicle</h2>
      <div className="input">
        <div className="mb-2">
          
          <input
            type="text"
            id="editVehicleName"
            name="vehicleName" // Ensure this matches what handleInputChange expects
            placeholder="Vehicle Name"
            className="form-control"
            value={vehicleName}
            onChange={handleInputChange}
            // invalid={!!errors.vehicleName}
          />
          <Tooltip placement="bottom-end" isOpen={!!errors.vehicleName} target="editVehicleName">
            {errors.vehicleName}
          </Tooltip>
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="editVehicleNum"
            name="vehicleNum" // Ensure this matches what handleInputChange expects
            placeholder="Vehicle Number"
            className="form-control"
            value={vehicleNum}
            onChange={handleInputChange}
            // invalid={!!errors.vehicleNum}
          />
          <Tooltip placement="bottom-end" isOpen={!!errors.vehicleNum} target="editVehicleNum">
            {errors.vehicleNum}
          </Tooltip>
        </div>
        <div className="mb-2">
          <input
            type="text"
            id="editContactNum"
            name="contactNum" // Ensure this matches what handleInputChange expects
            placeholder="Contact Number"
            className="form-control"
            value={contactNum}
            onChange={handleInputChange}
            // invalid={!!errors.contactNum}
          />
          <Tooltip placement="bottom-end" isOpen={!!errors.contactNum} target="editContactNum">
            {errors.contactNum}
          </Tooltip>
        </div>
        <div className="mt-3 float-end">
          <Button color="secondary" className="m-2" onClick={toggleEditModal}>Cancel</Button>
          <Button color="primary" type="submit">Update</Button>
        </div>
      </div>
    </form>
  </ModalBody>
</Modal>
    </div>
    </div>
  );
};

export default VehiclesList;
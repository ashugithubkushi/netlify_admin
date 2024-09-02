import React, { useEffect, useState } from 'react';
import './Users.css'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Tooltip} from 'reactstrap';
import { Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';

const Users = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

//   const {id} = useParams()


  // create
    const validateForm = () => {
      let isValid = true;
      const newErrors = {};

      
      if (!username.trim()) {
        newErrors.username = 'Username is required';
        isValid = false;
      }

      if (!email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      }

      if (!password.trim()) {
        newErrors.password = 'Password is required';
        isValid = false;
      }

      if (!designation.trim()) {
        newErrors.designation = 'designation is required';
        isValid = false;
      }

      if (!contact.trim()) {
        newErrors.contact = 'contact is required';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        axios.post("http://localhost:3000/createCreateuser", { username, email, password, designation, contact })
        // axios.post("https://slots-table.free.beeceptor.com/users-table", { username, email, password, designation, contact })
          .then(result => {
            console.log(result);
            console.log('Submitted Data:', username,  email, password, designation, contact);
            setUser([...user, { username, email, password, designation, contact }]);
            toggleModal();
          })
          .catch(err => console.log(err));
      }
    };
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'username') {
        setErrors({ ...errors, username: '' });
        setUsername(value);
      } else if (name === 'email') {
        setErrors({ ...errors, email: '' });
        setEmail(value);
      } else if (name === 'password') {
        setErrors({ ...errors, password: '' });
        setPassword(value);
      }else if (name === 'designation') {
        setErrors({ ...errors, designation: '' });
        setDesignation(value);
      }else if (name === 'contact') {
        setErrors({ ...errors, contact: '' });
        setContact(value);
      }
    };


    const resetForm = () => {
      setUsername('');
      setEmail('');
      setPassword('');
      setDesignation('');
      setContact('');
      setErrors({});
    };


    const toggleModal = () => {
      if (!showModal) {
        setUsername('');
        setEmail('');
        setPassword('');
        setDesignation('');
        setContact('');
        setErrors({});
      }
      setShowModal(!showModal);
    };

    const toggleEditModal = (userData) => {
      if (!showEditModal) {
        setUsername(userData.username);
        setEmail(userData.email);
        setPassword(userData.password);
        setDesignation(userData.designation);
        setContact(userData.contact);
      }
      setShowEditModal(!showEditModal);
      setEditUserId(userData._id);
    };
    


  useEffect(() => {
    axios.get("http://localhost:3000/createusers")
    // axios.get("https://get-users.free.beeceptor.com/users-get")
      .then(response => {
        setUser(response.data); 
        console.log("API Response of Add Users:", response);    
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  


const handleUpdate = (e) => {
  e.preventDefault();
  if (validateForm()) {
    axios.put(`http://localhost:3000/updateCreateuser/${editUserId}`, {
    // axios.put(`https://mp7c7dad67444e159894.free.beeceptor.com/user-update/${editUserId}`, { 
     username, 
      email, 
      password, 
      designation, 
      contact 
    })
      .then(result => {
        console.log(result);
        const updatedIndex = user.findIndex(u => u._id === editUserId);
        const updatedUser = { ...user[updatedIndex], username, email, password, designation, contact };
        const updatedUsers = [...user.slice(0, updatedIndex), updatedUser, ...user.slice(updatedIndex + 1)];
        setUser(updatedUsers);
        toggleEditModal();
      })
      .catch(err => console.log(err));
  }
};


// const deleteUser = (userId) => {
//   axios.delete(`http://localhost:3000/deleteCreateuser/${userId}`)
// //   axios.delete(`https://mp7c7dad67444e159894.free.beeceptor.com/user-delete/${userId}`)
//     .then(result => {
//       console.log(result.data); // Log successful response
//       // Handle success as needed
//     })
//     .catch(err => {
//       console.error('Delete user error:', err); // Log error for debugging
//       // Handle error and provide user feedback
//     });
// };


const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios
        .delete(`http://localhost:3000/deleteCreateuser/${id}`)
        .then((result) => {
          console.log(result);
          setUser((prevUsers) =>
            prevUsers.filter((user) => user._id !== id)
          );
        //   setVehicleCounts((prevCounts) => ({
        //     ...prevCounts,
        //     [vehicleName]: prevCounts[vehicleName] - 1,
        //   }));
        })
        .catch((err) => console.log(err));
    }
  };


//image 
// const [image, setImage] = useState(null); 
// const handleImageUpload = (e) => {
//   const file = e.target.files[0]; // Get the uploaded file
//   setImage(file); // Store the uploaded file in state
// };



  return (
<div>
<Navbar/>
    <div className="">

{/* <Modal isOpen={showModal} toggle={toggleModal} centered style={{width:"90%"}}> */}
  <Modal isOpen={showModal} toggle={toggleModal} centered={true} style={{ marginTop: "40px" }} size="md">
  <ModalHeader style={{ backgroundColor: '#f0f0f0' }} toggle={toggleModal}> <div className="fw-semibold">Create User</div></ModalHeader>
      <ModalBody>
       

        <form onSubmit={handleSubmit}>
          <div className="row">


          {/* <div className="col-lg-6 col-md-6">
  <div className="form-group">
    <label className='d-block fw-semibold'  style={{ fontSize: '16px' }}>Image</label>
    <input
      type="file"
      className="input-control"
      id="imageUpload"
      name="image"
      onChange={handleImageUpload}
      style={{ fontSize: '14px' }} 
    />
    <Tooltip placement="bottom-end" isOpen={!!errors.image} target="imageUpload">
      {errors.image}
    </Tooltip>
  </div>
</div> */}

            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className='d-block fw-semibold' style={{ fontSize: '16px' }}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="User Name"
                  className="input-control"
                  value={username}
                  onChange={handleInputChange}
                  style={{ fontSize: '14px' }}
                  invalid={!!errors.username}
                />
                 <Tooltip placement="bottom-end" isOpen={!!errors.username} target="username">
                  {errors.username}
                </Tooltip>
                
              </div>
            </div>


            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className='d-block fw-semibold' style={{ fontSize: '16px' }}>Email</label>
                {/* <input type="text" className='input-control'/> */}
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="input-control"
                  value={email}
                  onChange={handleInputChange}
                  style={{ fontSize: '14px' }}
                />
                 <Tooltip placement="bottom-end" isOpen={!!errors.email} target="email">
                  {errors.email}
                </Tooltip>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className='d-block fw-semibold' style={{ fontSize: '16px' }}>Designation</label>
                {/* <input type="text" className='input-control'/> */}
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  placeholder="Designation"
                  className="input-control"
                  value={designation}
                  onChange={handleInputChange}
                  style={{ fontSize: '14px' }}
                />
                <Tooltip placement="bottom-end" isOpen={!!errors.designation} target="designation">
                  {errors.designation}
                </Tooltip>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className='d-block fw-semibold' style={{ fontSize: '16px' }}>Password</label>
                {/* <input type="text" className='input-control'/> */}
                <input
                  // type="password"
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="input-control"
                  value={password}
                  onChange={handleInputChange}
                  style={{ fontSize: '14px' }}
                />
                <Tooltip placement="bottom-end" isOpen={!!errors.password} target="password">
                  {errors.password}
                </Tooltip>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className='d-block fw-semibold' style={{ fontSize: '16px' }}>Contact</label>
                {/* <input type="text" className='input-control'/> */}
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Contact"
                  className="input-control"
                  value={contact}
                  onChange={handleInputChange}
                  style={{ fontSize: '14px' }}
                />
                <Tooltip placement="bottom-end" isOpen={!!errors.contact} target="contact">
                  {errors.contact}
                </Tooltip>
              </div>
            </div>


            <div className="mt-3 text-end">
            <Button color="secondary" className='me-3' onClick={resetForm}>Reset</Button>
            <Button color="primary" type='submit'>Create</Button>
          </div>

          </div>
        </form>
      </ModalBody>
    </Modal>


      <Box sx={{ width: '100%', p:2 , height: '100vh', mt:1, borderRadius:5}}>
<div className="table-container1">

<div className="table-container">

    <div className="name-with-button-container">
    <span className="name"><h5><b>User Data</b></h5></span>
       
    <button className="btn btn-success float-end" onClick={toggleModal}>
          Add User
        </button>
 </div>

        <table className="table-no-border">
  <thead>
    <tr>
      <th>Sl No</th>
      <th>User Name</th>
      <th>Email Id</th>
      <th>Password</th>
      <th>Designation</th>
      <th>Contact</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {user.map((userData, index) => {
      return (
        <tr key={index} className="divider-row3">
          <td>{index + 1}</td> {/* Sl No column */}
          <td>{userData.username}</td>
          <td>{userData.email}</td>
          <td>{userData.password}</td>
          <td>{userData.designation}</td>
          <td>{userData.contact}</td>
          <td>
            <button className='btn btn-success m-1' onClick={() => toggleEditModal(userData)}>Edit</button>
            <button className="btn btn-danger delete-button" onClick={() => handleDelete(userData._id)}>Delete</button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>




           {/* edit */}
           <Modal isOpen={showEditModal} toggle={() => setShowEditModal(!showEditModal)} centered={true}>
        <ModalBody>
        <form onSubmit={handleUpdate}>
        <h2>Update User</h2>

        <div className="mb-2">
          <label htmlFor="">Username Name</label> 
          <input type="text" placeholder='User Name' className='form-control'
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
        </div>
      
        <div className="mb-2">
          <label htmlFor="">Email</label>
          <input type="text" placeholder='Email' className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
      
        <div className="mb-2">
          <label htmlFor="">Password</label>
          <input type="Password" placeholder='Password' className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
      
        <div className="mb-2">
          <label htmlFor="">Designation</label>
          <input type="text" placeholder='Designation' className='form-control'
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}/>
        </div>
      
        <div className="mb-2">
          <label htmlFor="">Contact Num</label>
          <input type="number" placeholder='Conatct Num' className='form-control'
          value={contact}
          onChange={(e) => setContact(e.target.value)}/>
        </div>
        <Button color="secondary" className='m-2' onClick={resetForm}>Reset</Button>
              <Button color="primary" type='submit'>Update</Button>{' '}
        {/* <button className='btn btn-primary'>Update</button> */}
      </form>
        </ModalBody>
      </Modal>
    </div>
  </div>
  </Box>
</div>

</div>
  );
}

export default Users;
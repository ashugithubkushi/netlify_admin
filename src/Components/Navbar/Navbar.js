
import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Navbar({ toggleSidebar }) {
  const [username, setUsername] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('https://login1.free.beeceptor.com/username');
        // const response = await fetch('');
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); 
          console.log(response.status)
          console.log(data)
        } else {
          console.error('Failed to fetch username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  return (
    <div className="navbar">
      <div>
        <b><h2 className='text1'>ATMOS</h2></b>
      </div>
      <div className="navbar-right">
        {/* Add any other elements or components if needed */}
      </div>

      <div className="user" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <NotificationsActiveIcon style={{ marginRight: '25px' }} />
        <b>User- {username}</b>
        <div className={`message-box ${showMessage ? 'show' : ''}`}>
          <div>
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li><Link to="/" >Logout</Link></li> {/* Logout with onClick handler */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

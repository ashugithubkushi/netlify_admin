
import { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");


  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setPasswordError("");
//     setLoginError("");

//     if (!validateUsername(username)) {
//       setUsernameError("Username is required");
//       return;
//     }

//     if (!validatePassword(password)) {
//       setPasswordError(
//         "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, and one number"
//       );
//       return;
//     }

//   //   axioshttp://localhost:3000/createAdminlogin
//   //     .post("", {
//   //       username,
//   //       password,
//   //     })
//   //     .then((response) => {
//   //       console.log(response.data);
//   //       const { username } = response.data;
//   //       navigate("/dashboard", { state: { username } }); 
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //       setLoginError("Login failed. Please try again.");
//   //     });

//   //   setUsername("");
//   //   setPassword("");


    
    
 
//   axios
//     .post("https://mp31c0a15b1e5005443b.free.beeceptor.com/login", {
//       username,
//       password,
//     })
//     .then((response) => {
//       console.log("Response from server:", response); 
//       console.log(" received data:", response.data); 
//       const { username, password } = response.data;
//       navigate("/dashboard", { state: { username, password } });
//     })
//     .catch((error) => {
//       console.error("Error occurred:", error);
//       setLoginError("Login failed. Please try again.");
//     });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   setPasswordError("");
//   setLoginError("");

//   if (!validateUsername(username)) {
//     setUsernameError("Username is required");
//     return;
//   }

//   if (!validatePassword(password)) {
//     setPasswordError(
//       "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, and one number"
//     );
//     return;
//   }

//   axios
//     .post("https://mp31c0a15b1e5005443b.free.beeceptor.com/login", {
//       username,
//       password,
//     })
//     .then((response) => {
//       console.log("Response from server:", response);
//       console.log("Full response data:", response.data);

   
//       // const { username, password } = response.data;
//       console.log("Username:", username);
//       console.log("Password:", password); 

    
//       navigate("/dashboard", { state: { username, password } });
//     })
//     .catch((error) => {
//       console.error("Error occurred:", error);
//       setLoginError("Login failed. Please try again.");
//     });
// };
// const handleSubmit = (e) => {
//   e.preventDefault();
//   setPasswordError("");
//   setLoginError("");

//   if (!validateUsername(username)) {
//     setUsernameError("Username is required");
//     return;
//   }

//   if (!validatePassword(password)) {
//     setPasswordError(
//       "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, and one number"
//     );
//     return;
//   }

//   axios
//     .post("https://mp31c0a15b1e5005443b.free.beeceptor.com/login", {
//       username,
//       password,
//     })
//     .then((response) => {
//       console.log("Response from server:", response);
//       console.log("Full response data:", response.data);

//       // Destructure the response data
//       const { success, username: responseUsername, password: responsePassword } = response.data;

//       if (success) {
//         console.log("Username:", responseUsername);
//         console.log("Password:", responsePassword);

//         // Navigate to the dashboard with the username and password
//         navigate("/dashboard", { state: { username: responseUsername, password: responsePassword } });
//       } else {
//         // Handle unauthorized user
//         setLoginError("Unauthorized user. Please check your username and password.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error occurred:", error);
//       setLoginError("Login failed. Please try again.");
//     });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   setPasswordError("");
//   setLoginError("");

//   if (!validateUsername(username)) {
//     setUsernameError("Username is required");
//     return;
//   }

//   if (!validatePassword(password)) {
//     setPasswordError(
//       "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, and one number"
//     );
//     return;
//   }

//   axios
//     .post("https://mp31c0a15b1e5005443b.free.beeceptor.com/login", {
//       username,
//       password,
//     })
//     .then((response) => {
//       console.log("Response from server:", response);
//       console.log("Full response data:", response.data);

//       const { success, username: responseUsername, password: responsePassword } = response.data;

//       // Check if the API response matches the expected credentials
//       if (success && username === "Admin" && password === "Admin@12345") {
//         console.log("Username:", responseUsername);
//         console.log("Password:", responsePassword);

//         navigate("/dashboard", { state: { username: responseUsername, password: responsePassword } });
//       } else {
//         setLoginError("Unauthorized user. Please check your username and password.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error occurred:", error);
//       setLoginError("Login failed. Please try again.");
//     });
// };

const handleSubmit = (e) => {
  e.preventDefault();
  setPasswordError("");
  setLoginError("");

  if (!validateUsername(username)) {
    setUsernameError("Username is required");
    return;
  }

  if (!validatePassword(password)) {
    setPasswordError(
      "Password must be at least 8 characters long, including at least one uppercase letter, one lowercase letter, and one number"
    );
    return;
  }

  axios
    .post("https://mp31c0a15b1e5005443b.free.beeceptor.com/login", {
    // .post("http://localhost:3000/createAdminlogin", {
    // .post("", {
      username,
      password,
    })
    .then((response) => {
      console.log("Response from server:", response);
      console.log("Full response data:", response.data);

      const { success, users } = response.data;

      // Check
      const validUser = users.find(user => user.username === username && user.password === password);



      if (success && validUser) {
        console.log("Logged in as:", validUser.username);
        navigate("/dashboard", { state: { username: validUser.username, password: validUser.password } });
      } else {
        setLoginError("Unauthorized user. Please check your username and password.");
      }
    })
    .catch((error) => { 
      console.error("Error occurred:", error);
      setLoginError("Login failed. Please try again.");
    });
};

  return (
    
    <div className="form">
      <div className="login-wrapper">
        <div className="login-box">
          <form onSubmit={handleSubmit} className="login-form">
          {/* <h2 class="center-heading">Login
  <div class="login-icon"></div>
  <span class="login-name">Login</span>
</h2> */}
<div className="text-form">
  <h2 className='text1'>ATMOS</h2>
</div>

            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="input-field"
                // style={{ width: '100%'}}
                placeholder="Enter Username"
              />
              {usernameError && <div className="error">{usernameError}</div>}
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="input-field"
                // style={{ marginBottom: '10px'}}
                placeholder="Enter Password"
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>

            <div className="submit-button">
            <button type="submit" className="colorful-button" style={{ marginBottom: '10px' }}>
            <b>Login</b>
            </button>
            </div>
            <div className="error">{loginError}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
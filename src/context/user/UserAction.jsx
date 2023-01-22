import axios from "axios";
const API_URL = "http://localhost:4000/api/users/";


// Register user
const register = async (userData) => {
  const res = await axios.post(API_URL, userData).then((response)=>{
    console.log(response.data.JSON);
    localStorage.setItem('user', JSON.stringify(response.data))
    return res.data;
  }).catch(err=>{
    alert(err.message)
    console.log(err.response.data.message)
    return err.response.data.message
  })
};

// Login user
const login = async (userData) => {
  const res =await axios.post(API_URL +'login', userData).then((response) =>{
    console.log(response.data.JSON)
    localStorage.setItem("user", JSON.stringify(response.data));
    return res.data
  }).catch(err=>{
    alert(err.message)
    console.log(err.response.data.message)
    return err.response.data.message
  })

  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const UserAction = {
  register,
  logout,
  login,
};

export default UserAction;
